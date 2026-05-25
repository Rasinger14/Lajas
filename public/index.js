// ============================================================================
//  Pagina principal
// ============================================================================

document.getElementById('anio').textContent = new Date().getFullYear();

// ---- Tabs ----
const tabs = document.querySelectorAll('.tabs-nav .tab');
const secciones = {
  perfiles: document.getElementById('sec-perfiles'),
  trips:    document.getElementById('sec-trips'),
  eventos:  document.getElementById('sec-eventos')
};

function activarTab(nombre) {
  tabs.forEach(t => t.classList.toggle('activo', t.dataset.tab === nombre));
  Object.entries(secciones).forEach(([key, el]) => {
    el.classList.toggle('seccion-oculta', key !== nombre);
  });
  history.replaceState(null, '', '#' + nombre);
}

tabs.forEach(tab => tab.addEventListener('click', () => activarTab(tab.dataset.tab)));

const hashInicial = window.location.hash.replace('#', '');
if (secciones[hashInicial]) activarTab(hashInicial);

// ---- Helpers ----
function formatearFecha(iso) {
  const [y, m, d] = iso.split('-');
  const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
}

function diasRestantes(iso) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fecha = new Date(iso + 'T00:00:00');
  const diff = Math.round((fecha - hoy) / (1000 * 60 * 60 * 24));
  if (diff < 0)   return 'Ya pasó';
  if (diff === 0) return '¡Hoy!';
  if (diff === 1) return 'Mañana';
  return `En ${diff} días`;
}

// ---- Perfiles ----
const contenedorLista = document.getElementById('lista');

function dibujarAvatar(amigo) {
  if (amigo.foto) {
    return `<div class="avatar" style="background:${amigo.color}"><img src="${amigo.foto}" alt="${amigo.nombre}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;"></div>`;
  }
  return `<div class="avatar" style="background:${amigo.color}">${amigo.iniciales}</div>`;
}

AMIGOS.forEach((amigo, i) => {
  const enlace = document.createElement('a');
  enlace.className = 'perfil-link';
  enlace.href = `perfil.html?id=${amigo.id}`;
  enlace.style.animationDelay = (i * 0.08) + 's';
  enlace.innerHTML = `
    ${dibujarAvatar(amigo)}
    <div>
      <h2>${amigo.nombre}</h2>
      <div class="rol">${amigo.rol}</div>
    </div>
    <span class="flecha">→</span>
  `;
  contenedorLista.appendChild(enlace);
});

// ---- Trips ----
const tripsContenido = document.getElementById('trips-contenido');

if (TRIPS.length === 0) {
  tripsContenido.innerHTML = `
    <div class="seccion-vacia">
      <div class="seccion-vacia-icono">📸</div>
      <h3>Próximamente...</h3>
      <p>Los trips de las Lajas aparecerán aquí. ¡Los primeros recuerdos están por llegar!</p>
    </div>
  `;
} else {
  const grid = document.createElement('div');
  grid.className = 'trips-grid';
  TRIPS.forEach((trip, i) => {
    const card = document.createElement('div');
    card.className = 'trip-card';
    card.style.animationDelay = (i * 0.1) + 's';
    const portadaHTML = trip.portada
      ? `<div class="trip-portada"><img src="${trip.portada}" alt="${trip.titulo}"></div>`
      : `<div class="trip-portada trip-portada-vacia"><span>📷</span></div>`;
    card.innerHTML = `
      ${portadaHTML}
      <div class="trip-info">
        <h3>${trip.titulo}</h3>
        ${trip.fecha ? `<p class="trip-fecha">${formatearFecha(trip.fecha)}</p>` : ''}
        <p class="trip-desc">${trip.descripcion || ''}</p>
        ${trip.fotos.length > 0 ? `<p class="trip-contador">${trip.fotos.length} foto${trip.fotos.length !== 1 ? 's' : ''}</p>` : ''}
      </div>
    `;
    grid.appendChild(card);
  });
  tripsContenido.appendChild(grid);
}

// ---- Eventos ----
const eventosContenido = document.getElementById('eventos-contenido');

if (EVENTOS.length === 0) {
  eventosContenido.innerHTML = `
    <div class="seccion-vacia">
      <div class="seccion-vacia-icono">📅</div>
      <h3>Sin eventos por ahora</h3>
      <p>Cuando haya algo planeado, aparecerá aquí.</p>
    </div>
  `;
} else {
  const lista = document.createElement('div');
  lista.className = 'eventos-lista';
  EVENTOS.forEach((evento, i) => {
    const card = document.createElement('a');
    card.className = 'evento-card';
    card.href = `evento.html?id=${evento.id}`;
    card.style.animationDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="evento-emoji" style="background:${evento.color}20; border-color:${evento.color}40">
        ${evento.emoji}
      </div>
      <div class="evento-info">
        <span class="evento-cat">${evento.categoria}</span>
        <h3>${evento.titulo}</h3>
        <p class="evento-fecha">📅 ${formatearFecha(evento.fecha)}</p>
        <p class="evento-lugar">📍 ${evento.lugar}</p>
      </div>
      <div class="evento-lado">
        <span class="evento-dias" style="color:${evento.color}">${diasRestantes(evento.fecha)}</span>
        <span class="flecha">→</span>
      </div>
    `;
    lista.appendChild(card);
  });
  eventosContenido.appendChild(lista);
}
