const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo"); // "ucsal" ou "nacional"
const slug = params.get("slug");

const fonte = tipo === "ucsal" ? campiUCSal : catolicasBrasil;
const item = fonte.find((x) => x.slug === slug);

const CORES = { ativo: "#1a7a3c", inativo: "#a3482b", nacional: "#2b4aa3" };

const secao = (titulo, corpo) =>
  corpo ? `<section class="bloco"><h2>${titulo}</h2>${corpo}</section>` : "";

const temItens = (arr) => Array.isArray(arr) && arr.length > 0;

// Só aparece nos campi que têm a configuração "comparar" no data.js
const comparar = item.comparar
  ? `<a class="btn-comparar" href="comparar.html?slug=${item.slug}">Comparar imagens de satélite ao longo dos anos</a>`
  : "";

if (!item) {
  document.getElementById("nao-encontrado").hidden = false;
} else {
  document.title = `${item.nome} — UCSal 65 Anos`;

  const hero = document.getElementById("hero");
  hero.style.background = CORES[item.status] || CORES.nacional;
  hero.hidden = false;
  document.getElementById("hero-titulo").textContent = item.nome;
  document.getElementById("hero-endereco").textContent =
    item.endereco || item.cidade || "";
  document.getElementById("hero-resumo").textContent = item.resumo || "";

  const statusEl = document.getElementById("hero-status");
  if (item.status) statusEl.textContent = item.status.toUpperCase();
  else statusEl.hidden = true;

  const fatos = item.periodo
    ? `
    <div class="fatos">
      <div class="fato"><b>Período</b><span>${item.periodo}</span></div>
      <div class="fato"><b>Situação</b><span>${item.status === "ativo" ? "Em funcionamento" : "Desativado"}</span></div>
    </div>`
    : "";

  const linhaDoTempo = temItens(item.linhaDoTempo)
    ? `<ol class="timeline">${item.linhaDoTempo
        .map(
          (e) =>
            `<li><span class="t-ano">${e.ano}</span><p>${e.texto}</p></li>`,
        )
        .join("")}</ol>`
    : "";

  const historia = temItens(item.historia)
    ? item.historia.map((p) => `<p>${p}</p>`).join("")
    : item.descricao
      ? `<p>${item.descricao}</p>`
      : ""; // fallback p/ universidades nacionais

  const leitura = item.leituraEspacial
    ? `<div class="destaque"><p>${item.leituraEspacial}</p></div>`
    : "";

  const cursos = temItens(item.cursos)
    ? `<ul class="cursos">${item.cursos.map((c) => `<li>${c}</li>`).join("")}</ul>`
    : "";

  const galeria = temItens(item.fotos)
    ? `<div class="galeria">${item.fotos
        .map(
          (f) => `
        <figure>
          <img src="${f.src}" alt="${f.legenda}" loading="lazy"
               onerror="this.closest('figure').remove()" />
          <figcaption>${f.legenda}${f.credito ? ` — ${f.credito}` : ""}</figcaption>
        </figure>`,
        )
        .join("")}</div>`
    : "";

  const depoimentos = temItens(item.depoimentos)
    ? item.depoimentos
        .map(
          (d) => `
        <div class="depoimento">
          <p>“${d.texto}”</p>
          <cite>${d.nome}${d.vinculo ? `, ${d.vinculo}` : ""}</cite>
        </div>`,
        )
        .join("")
    : "";

  const fontes = temItens(item.fontes)
    ? `<ul class="fontes">${item.fontes.map((f) => `<li>${f}</li>`).join("")}</ul>`
    : "";

  const outros =
    tipo === "ucsal"
      ? `<div class="outros">${campiUCSal
          .filter((c) => c.slug !== item.slug)
          .map(
            (c) =>
              `<a href="detalhe.html?tipo=ucsal&slug=${c.slug}">${c.nome}</a>`,
          )
          .join("")}</div>`
      : "";

  document.getElementById("conteudo").innerHTML = `
    ${fatos}
    ${secao("Linha do tempo", linhaDoTempo)}
    ${secao("História", historia)}
    ${secao("Leitura do espaço", leitura)}
    ${secao("Cursos", cursos)}
    ${secao("Fotos", galeria)}
    ${secao("Depoimentos", depoimentos)}
    ${secao("Imagens de satélite", comparar)}
    ${item.coords ? secao("Localização", '<div id="mini-mapa"></div>') : ""}
    ${secao("Fontes", fontes)}
    ${secao("Conheça os outros campi", outros)}
  `;

  if (item.coords) {
    const mini = L.map("mini-mapa", {
      dragging: !L.Browser.mobile,
      scrollWheelZoom: false,
      tap: false,
    }).setView(item.coords, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mini);

    L.marker(item.coords, {
      icon: criarIconePin(CORES[item.status] || CORES.nacional),
    }).addTo(mini);
  }
}
