/*
  Comparador de imagens de satélite (Esri World Imagery Wayback).

  Ideia central: duas camadas de mapa ficam EMPILHADAS no mesmo lugar,
  cada uma numa data diferente. Cortamos a de cima ao meio (CSS "clip"),
  então a esquerda mostra uma data e a direita mostra a outra.
  A linha branca é só o controle que decide onde fica o corte.
*/

// Lista oficial de TODAS as versões do Wayback (a mesma que o app da Esri usa).
// Carregamos em tempo real em vez de copiar os números de versão para o
// código: assim, quando a Esri publicar versões novas, elas aparecem
// sozinhas, e não existe número digitado errado.
const URL_CONFIG =
  "https://s3-us-west-2.amazonaws.com/config.maptiles.arcgis.com/waybackconfig.json";

const ATRIBUICAO =
  "Imagens: Esri, Maxar, Earthstar Geographics e a comunidade de usuários GIS (Wayback Archive)";

const $ = (id) => document.getElementById(id);
const dataBR = (iso) => iso.split("-").reverse().join("/");

// O Wayback usa {level}/{row}/{col}; o Leaflet espera {z}/{y}/{x}.
// É a mesma coisa com nomes diferentes: nível de zoom, linha e coluna.
const urlLeaflet = (urlEsri) =>
  urlEsri
    .replace("{level}", "{z}")
    .replace("{row}", "{y}")
    .replace("{col}", "{x}");

async function carregarVersoes() {
  const resp = await fetch(URL_CONFIG);
  if (!resp.ok) throw new Error("HTTP " + resp.status);
  const config = await resp.json();

  // O arquivo é um objeto { numeroDaVersao: {...dados} }. A data não vem
  // como campo próprio, está no título ("World Imagery (Wayback 2023-12-07)"),
  // então extraímos com regex.
  return Object.entries(config)
    .map(([num, v]) => {
      const m = v.itemTitle.match(/(\d{4}-\d{2}-\d{2})/);
      return m
        ? { num, data: m[1], tempo: Date.parse(m[1]), url: v.itemURL }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.tempo - b.tempo); // da mais antiga para a mais nova
}

// Para cada data pedida no data.js, pega a versão mais próxima.
// "Mais próxima" (e não exata) porque a Esri não publica toda semana:
// se você pedir 2014-03-01 e só existir 2014-02-20, usamos essa.
function escolherPorDatas(todas, datas) {
  const escolhidas = new Map(); // Map evita duplicata se duas datas caírem na mesma versão
  datas.forEach((d) => {
    const alvo = Date.parse(d);
    const v = todas.reduce((melhor, atual) =>
      Math.abs(atual.tempo - alvo) < Math.abs(melhor.tempo - alvo)
        ? atual
        : melhor,
    );
    escolhidas.set(v.num, v);
  });
  return [...escolhidas.values()].sort((a, b) => a.tempo - b.tempo);
}

function mostrarStatus(texto) {
  $("status").textContent = texto;
  $("status").hidden = false;
}

async function iniciar() {
  const slug = new URLSearchParams(location.search).get("slug");
  const campus = campiUCSal.find((c) => c.slug === slug);
  if (!campus) return mostrarStatus("Campus não encontrado.");

  $("titulo").textContent = campus.nome;
  $("link-voltar").href = `detalhe.html?tipo=ucsal&slug=${campus.slug}`;

  let versoes;
  try {
    versoes = await carregarVersoes();
  } catch (erro) {
    console.error(erro);
    return mostrarStatus(
      "Não foi possível carregar as versões do Wayback. Verifique a internet.",
    );
  }

  const cfg = campus.comparar || {};
  if (cfg.versoes && cfg.versoes.length)
    versoes = escolherPorDatas(versoes, cfg.versoes);
  if (versoes.length < 2)
    return mostrarStatus("É preciso ao menos duas versões para comparar.");

  /* ===== Mapa ===== */
  const map = L.map("mapa", { zoomControl: false, maxZoom: 20 }).setView(
    campus.coords,
    cfg.zoom || 17,
  );

  // Zoom embaixo à direita: o canto de cima já tem os seletores de data.
  L.control.zoom({ position: "bottomright" }).addTo(map);

  // maxNativeZoom: a partir de 18 o Leaflet AMPLIA os tiles do nível 18 em vez
  // de pedir tiles que podem não existir (versões antigas costumam não ter
  // imagem em zoom alto, e aí apareceria um quadrado cinza de "sem dados").
  // Perde um pouco de nitidez, mas nunca fica vazio. Se quiser testar mais
  // detalhe, suba para 19.
  const criarCamada = (v) =>
    L.tileLayer(urlLeaflet(v.url), {
      maxNativeZoom: 18,
      maxZoom: 20,
      attribution: ATRIBUICAO,
    });

  const camadaEsq = criarCamada(versoes[0]).addTo(map); // mais antiga
  const camadaDir = criarCamada(versoes[versoes.length - 1]).addTo(map); // mais recente

  // Anel vazado marcando o campus. Fica no painel de overlay do Leaflet,
  // que não é cortado, então aparece dos dois lados da linha.

  /* ===== Seletores de data ===== */
  [$("sel-esq"), $("sel-dir")].forEach((sel) => {
    versoes.forEach((v) => sel.add(new Option(dataBR(v.data), v.num)));
  });
  $("sel-esq").value = versoes[0].num;
  $("sel-dir").value = versoes[versoes.length - 1].num;

  const porNum = (num) => versoes.find((v) => v.num === num);
  $("sel-esq").addEventListener("change", (e) =>
    camadaEsq.setUrl(urlLeaflet(porNum(e.target.value).url)),
  );
  $("sel-dir").addEventListener("change", (e) =>
    camadaDir.setUrl(urlLeaflet(porNum(e.target.value).url)),
  );

  /* ===== O corte (a parte mais importante) ===== */
  let proporcao = 0.5; // 0 = tudo "depois", 1 = tudo "antes"
  let modo = "dividido";

  function atualizarCorte() {
    const p = modo === "dividido" ? proporcao : 1; // no modo "uma data" a esquerda cobre tudo

    // O Leaflet move os mapas por "painéis" que se deslocam quando você arrasta.
    // O CSS "clip" é medido nesse sistema de coordenadas do painel, não da tela.
    // Por isso convertemos: cantos da tela -> coordenadas do painel.
    const tamanho = map.getSize();
    const noroeste = map.containerPointToLayerPoint([0, 0]);
    const sudeste = map.containerPointToLayerPoint(tamanho);
    const cortaX = map.containerPointToLayerPoint([tamanho.x * p, 0]).x;

    // clip: rect(topo, direita, base, esquerda)
    // (propriedade antiga, mas é a que funciona de forma confiável nos
    // contêineres de camada do Leaflet; o clip-path moderno mede a partir
    // do próprio elemento, que aqui não tem tamanho.)
    camadaEsq.getContainer().style.clip = `rect(${noroeste.y}px, ${cortaX}px, ${sudeste.y}px, ${noroeste.x}px)`;
    camadaDir.getContainer().style.clip = `rect(${noroeste.y}px, ${sudeste.x}px, ${sudeste.y}px, ${cortaX}px)`;
  }

  // Refaz o corte sempre que o mapa se mexe, senão a linha "descola" da imagem.
  map.on("move zoom resize", atualizarCorte);
  atualizarCorte();

  /* ===== Arrastar a linha ===== */
  const alca = $("alca");
  let arrastando = false;

  function moverDivisor(p) {
    proporcao = Math.min(0.98, Math.max(0.02, p));
    $("divisor").style.left = proporcao * 100 + "%";
    atualizarCorte();
  }

  alca.addEventListener("pointerdown", (e) => {
    arrastando = true;
    alca.setPointerCapture(e.pointerId); // continua recebendo o movimento mesmo se o dedo sair da alça
    map.dragging.disable(); // senão o mapa também arrastaria junto
  });
  alca.addEventListener("pointermove", (e) => {
    if (!arrastando) return;
    const caixa = $("area").getBoundingClientRect();
    moverDivisor((e.clientX - caixa.left) / caixa.width);
  });
  const soltar = () => {
    arrastando = false;
    map.dragging.enable();
  };
  alca.addEventListener("pointerup", soltar);
  alca.addEventListener("pointercancel", soltar);

  // Acessibilidade: setas do teclado movem a linha quando a alça está focada.
  alca.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") moverDivisor(proporcao - 0.03);
    if (e.key === "ArrowRight") moverDivisor(proporcao + 0.03);
  });

  /* ===== Modos ===== */
  function aplicarModo(novo) {
    modo = novo;
    const dividido = modo === "dividido";
    $("divisor").hidden = !dividido;
    document.querySelector(".seletor.dir").hidden = !dividido;
    $("lbl-esq").textContent = dividido ? "Antes" : "Data";
    $("modo-dividido").classList.toggle("sel", dividido);
    $("modo-unica").classList.toggle("sel", !dividido);
    atualizarCorte();
  }
  $("modo-dividido").addEventListener("click", () => aplicarModo("dividido"));
  $("modo-unica").addEventListener("click", () => aplicarModo("unica"));
}

iniciar();
