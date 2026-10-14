const map = L.map("map").setView([-12.995, -38.47], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxZoom: 19,
}).addTo(map);

const CORES = {
  ativo: "#1a7a3c",
  inativo: "#a3482b",
  nacional: "#2b4aa3",
};

const ICONE_SETA = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>`;

function botaoVerMais(href) {
  return `<a class="popup-link" href="${href}" target="_blank" rel="noopener">
            <span>Ver página completa</span>${ICONE_SETA}
          </a>`;
}

const grupoAtivos = L.layerGroup();
const grupoInativos = L.layerGroup();
const grupoNacional = L.layerGroup();

function montarPopupUCSal(campus) {
  const listaCursos = campus.cursos.map((c) => `<li>${c}</li>`).join("");
  return `
    <p class="popup-title">${campus.nome}</p>
    <span class="popup-status ${campus.status}">${campus.status.toUpperCase()}</span>
    <div class="popup-section"><strong>Endereço:</strong> ${campus.endereco}</div>
    <div class="popup-section"><strong>Período:</strong> ${campus.periodo}</div>
    <div class="popup-section"><strong>Cursos:</strong></div>
    <ul style="font-size:12.5px; padding-left:16px; margin:0;">${listaCursos}</ul>
    ${botaoVerMais(`detalhe.html?tipo=ucsal&slug=${campus.slug}`)}
  `;
}

function adicionarInteracao(marker, { nome, coords, htmlPopup, zoom }) {
  marker.bindTooltip(nome, {
    direction: "top",
    offset: [0, -30],
    opacity: 0.95,
  });

  const popup = L.popup({ offset: [0, -30], maxWidth: 260 }).setContent(
    htmlPopup,
  );

  marker.on("click", () => {
    marker.closeTooltip();

    map.flyTo(coords, zoom, { duration: 1.2 });

    map.once("moveend", () => {
      popup.setLatLng(coords).openOn(map);
    });
  });
}

campiUCSal.forEach((campus) => {
  const pulsar = campus.status === "ativo"; // só o Pituaçu pulsa hoje
  const marker = L.marker(campus.coords, {
    icon: criarIconePin(CORES[campus.status], { pulsar }),
  });

  adicionarInteracao(marker, {
    nome: campus.nome,
    coords: campus.coords,
    htmlPopup: montarPopupUCSal(campus),
    zoom: 17,
  });

  (campus.status === "ativo" ? grupoAtivos : grupoInativos).addLayer(marker);
});

catolicasBrasil.forEach((uni) => {
  const marker = L.marker(uni.coords, { icon: criarIconePin(CORES.nacional) });

  adicionarInteracao(marker, {
    nome: uni.nome,
    coords: uni.coords,
    htmlPopup: `
      <p class="popup-title">${uni.nome}</p>
      <div class="popup-section"><strong>Cidade:</strong> ${uni.cidade}</div>
      <div class="popup-section">${uni.descricao}</div>
      ${botaoVerMais(`detalhe.html?tipo=nacional&slug=${uni.slug}`)}
    `,
    zoom: 17,
  });

  grupoNacional.addLayer(marker);
});

grupoAtivos.addTo(map);
grupoInativos.addTo(map);

const botoes = {
  todos: document.getElementById("filtro-todos"),
  ativos: document.getElementById("filtro-ativos"),
  inativos: document.getElementById("filtro-inativos"),
};

function aplicarFiltro(opcao) {
  map.removeLayer(grupoAtivos);
  map.removeLayer(grupoInativos);
  if (opcao === "todos" || opcao === "ativos") map.addLayer(grupoAtivos);
  if (opcao === "todos" || opcao === "inativos") map.addLayer(grupoInativos);

  Object.values(botoes).forEach((b) => b.classList.remove("ativo-selecionado"));
  botoes[opcao].classList.add("ativo-selecionado");
}

botoes.todos.addEventListener("click", () => aplicarFiltro("todos"));
botoes.ativos.addEventListener("click", () => aplicarFiltro("ativos"));
botoes.inativos.addEventListener("click", () => aplicarFiltro("inativos"));

document.getElementById("toggle-nacional").addEventListener("change", (e) => {
  if (e.target.checked) {
    grupoNacional.addTo(map);
    map.setZoom(4);
    map.setView([-14.5, -51.9], 4);
  } else {
    map.removeLayer(grupoNacional);
    map.setView([-12.995, -38.47], 12);
  }
});
