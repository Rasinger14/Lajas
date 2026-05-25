// ============================================================================
//  Bandeja: solicitudes de perfiles + participaciones en eventos
// ============================================================================

// ---- Tabs ----
const tabsBandeja = document.querySelectorAll('.tabs-nav .tab');
const secSolicitudes     = document.getElementById('sec-solicitudes');
const secParticipaciones = document.getElementById('sec-participaciones');

tabsBandeja.forEach(tab => {
  tab.addEventListener('click', () => {
    tabsBandeja.forEach(t => t.classList.toggle('activo', t === tab));
    const esParticipaciones = tab.dataset.tab === 'participaciones';
    secSolicitudes.classList.toggle('seccion-oculta', esParticipaciones);
    secParticipaciones.classList.toggle('seccion-oculta', !esParticipaciones);
  });
});

// ============================================================================
//  SOLICITUDES DE PERFILES
// ============================================================================

const cajaSolicitudes = document.getElementById('solicitudes');
const cajaFiltros     = document.getElementById('filtros');

let todasLasSolicitudes = [];
let filtroActual = 'todos';

function construirFiltros() {
  const botones = [{ id: 'todos', nombre: 'Todos' }]
    .concat(AMIGOS.map(a => ({ id: a.id, nombre: a.nombre.split(' ')[0] })));

  cajaFiltros.innerHTML = '';
  botones.forEach(b => {
    const boton = document.createElement('button');
    boton.textContent = b.nombre;
    if (b.id === filtroActual) boton.classList.add('activo');
    boton.addEventListener('click', () => {
      filtroActual = b.id;
      construirFiltros();
      pintarSolicitudes();
    });
    cajaFiltros.appendChild(boton);
  });
}

async function cargarSolicitudes() {
  try {
    const r = await fetch('/api/solicitudes');
    todasLasSolicitudes = await r.json();
    todasLasSolicitudes.reverse();
    pintarSolicitudes();
  } catch {
    cajaSolicitudes.innerHTML = '<p class="vacio">No se pudo conectar con el servidor. ¿Está encendido?</p>';
  }
}

function pintarSolicitudes() {
  const lista = filtroActual === 'todos'
    ? todasLasSolicitudes
    : todasLasSolicitudes.filter(s => s.amigoId === filtroActual);

  if (lista.length === 0) {
    cajaSolicitudes.innerHTML = '<p class="vacio">Aún no hay solicitudes por aquí. 🌵</p>';
    return;
  }

  cajaSolicitudes.innerHTML = '';
  lista.forEach(s => {
    const fecha = new Date(s.fecha).toLocaleString('es-ES', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
    const div = document.createElement('div');
    div.className = 'solicitud ' + s.estado;
    div.innerHTML = `
      <div class="fila">
        <span class="quien">${s.nombre}</span>
        <span class="para">→ para ${s.amigoNombre}</span>
        <span class="badge">${s.estado}</span>
      </div>
      <div class="contacto-dato"><strong>Contacto:</strong> ${s.contacto}</div>
      ${s.mensaje ? `<div class="mensaje">"${s.mensaje}"</div>` : ''}
      <div style="font-size:0.8rem;color:var(--suave);margin-bottom:12px;">${fecha}</div>
      <div class="acciones">
        <button class="boton secundario" data-accion="aceptar"  data-id="${s.id}">✓ Aceptar</button>
        <button class="boton peligro"    data-accion="rechazar" data-id="${s.id}">✕ Rechazar</button>
        <button class="boton"            data-accion="borrar"   data-id="${s.id}" style="background:var(--suave);">🗑 Borrar</button>
      </div>
    `;
    cajaSolicitudes.appendChild(div);
  });

  cajaSolicitudes.querySelectorAll('button[data-accion]').forEach(boton => {
    boton.addEventListener('click', () => {
      const id = Number(boton.dataset.id);
      const accion = boton.dataset.accion;
      if (accion === 'aceptar')  cambiarEstado(id, 'aceptada');
      if (accion === 'rechazar') cambiarEstado(id, 'rechazada');
      if (accion === 'borrar')   borrar(id);
    });
  });
}

async function cambiarEstado(id, estado) {
  await fetch('/api/solicitudes/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado })
  });
  cargarSolicitudes();
}

async function borrar(id) {
  if (!confirm('¿Seguro que quieres borrar esta solicitud?')) return;
  await fetch('/api/solicitudes/' + id, { method: 'DELETE' });
  cargarSolicitudes();
}

// ============================================================================
//  PARTICIPACIONES EN EVENTOS
// ============================================================================

const cajaParticipaciones  = document.getElementById('participaciones');
const cajaFiltrosEventos   = document.getElementById('filtros-eventos');

let todasLasParticipaciones = [];
let filtroEvento = 'todos';

function construirFiltrosEventos() {
  const eventosUnicos = [...new Set(todasLasParticipaciones.map(p => p.eventoId))];
  const botones = [{ id: 'todos', nombre: 'Todos' }].concat(
    eventosUnicos.map(eid => {
      const p = todasLasParticipaciones.find(x => x.eventoId === eid);
      const titulo = p ? p.eventoTitulo : eid;
      return { id: eid, nombre: titulo.split(' ').slice(0, 3).join(' ') };
    })
  );

  cajaFiltrosEventos.innerHTML = '';
  botones.forEach(b => {
    const boton = document.createElement('button');
    boton.textContent = b.nombre;
    if (b.id === filtroEvento) boton.classList.add('activo');
    boton.addEventListener('click', () => {
      filtroEvento = b.id;
      construirFiltrosEventos();
      pintarParticipaciones();
    });
    cajaFiltrosEventos.appendChild(boton);
  });
}

async function cargarParticipaciones() {
  try {
    const r = await fetch('/api/participaciones');
    todasLasParticipaciones = await r.json();
    todasLasParticipaciones.reverse();
    construirFiltrosEventos();
    pintarParticipaciones();
  } catch {
    cajaParticipaciones.innerHTML = '<p class="vacio">No se pudo conectar con el servidor.</p>';
  }
}

function pintarParticipaciones() {
  const lista = filtroEvento === 'todos'
    ? todasLasParticipaciones
    : todasLasParticipaciones.filter(p => p.eventoId === filtroEvento);

  if (lista.length === 0) {
    cajaParticipaciones.innerHTML = '<p class="vacio">Aún no hay participaciones registradas. 🌵</p>';
    return;
  }

  cajaParticipaciones.innerHTML = '';
  lista.forEach(p => {
    const fecha = new Date(p.fecha).toLocaleString('es-ES', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
    const div = document.createElement('div');
    div.className = 'solicitud pendiente';
    div.innerHTML = `
      <div class="fila">
        <span class="quien">${p.nombre}</span>
        <span class="para">→ ${p.eventoTitulo}</span>
        <span class="badge">asistencia</span>
      </div>
      <div class="contacto-dato"><strong>Contacto:</strong> ${p.contacto}</div>
      ${p.mensaje ? `<div class="mensaje">"${p.mensaje}"</div>` : ''}
      <div style="font-size:0.8rem;color:var(--suave);margin-bottom:12px;">${fecha}</div>
      <div class="acciones">
        <button class="boton peligro" data-id="${p.id}">🗑 Borrar</button>
      </div>
    `;
    cajaParticipaciones.appendChild(div);
  });

  cajaParticipaciones.querySelectorAll('.boton.peligro[data-id]').forEach(boton => {
    boton.addEventListener('click', async () => {
      if (!confirm('¿Borrar esta participación?')) return;
      await fetch('/api/participaciones/' + boton.dataset.id, { method: 'DELETE' });
      cargarParticipaciones();
    });
  });
}

// ============================================================================
//  Arranque
// ============================================================================
construirFiltros();
cargarSolicitudes();
cargarParticipaciones();
