function criarIconePin(cor, { pulsar = false } = {}) {
  const anelPulsante = pulsar
    ? `<span style="
        position:absolute; top:-6px; left:-6px; width:32px; height:32px;
        border-radius:50%; background:${cor}; opacity:0.35;
        animation: pulso 1.8s ease-out infinite;
      "></span>`
    : "";

  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative; width:20px; height:20px;">
        ${anelPulsante}
        <svg width="30" height="38" viewBox="0 0 30 38" style="position:absolute; top:-9px; left:-5px; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));">
          <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 23 15 23s15-12.5 15-23C30 6.7 23.3 0 15 0z" fill="${cor}" stroke="white" stroke-width="1.5"/>
          <!-- Chapéu de formatura simplificado, só pra reforçar "universidade" -->
          <path d="M15 11l7 3.2-7 3.2-7-3.2 7-3.2z" fill="white"/>
          <path d="M9.5 15.3v3.1c0 1 2.5 1.9 5.5 1.9s5.5-.9 5.5-1.9v-3.1" stroke="white" stroke-width="1.2" fill="none"/>
        </svg>
      </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 28],
  });
}
