// ============================================================================
//  Bandeja: ver y deliberar las solicitudes
// ============================================================================

const cajaSolicitudes = document.getElementById('solicitudes');
const cajaFiltros = document.getElementById('filtros');

let todasLasSolicitudes = [];   // aqui guardamos lo que llega del servidor
let filtroActual = 'todos';     // que amigo se esta mostrando

// ----------------------------------------------------------------------------
//  Construir los botones de filtro (Todos + un boton por amigo)
// ----------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------
//  Pedir las solicitudes al servidor (GET /api/solicitudes)
// ----------------------------------------------------------------------------
async function cargarSolicitudes() {
  try {
    const respuesta = await fetch('/api/solicitudes');
    todasLasSolicitudes = await respuesta.json();
    // Mostramos primero las mas recientes
    todasLasSolicitudes.reverse();
    pintarSolicitudes();
  } catch {
    cajaSolicitudes.innerHTML = '<p class="vacio">No se pudo conectar con el servidor. ¿Está encendido?</p>';
  }
}

// ----------------------------------------------------------------------------
//  Dibujar las solicitudes en pantalla
// ----------------------------------------------------------------------------
function pintarSolicitudes() {
  // Aplicamos el filtro por amigo
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
        <button class="boton"            data-accion="borrar"   data-id="${s.id}"
                style="background:var(--suave);">🗑 Borrar</button>
      </div>
    `;
    cajaSolicitudes.appendChild(div);
  });

  // Conectamos todos los botones de accion de golpe
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

// ----------------------------------------------------------------------------
//  Cambiar el estado (PATCH) y borrar (DELETE)
// ----------------------------------------------------------------------------
async function cambiarEstado(id, estado) {
  await fetch('/api/solicitudes/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado })
  });
  cargarSolicitudes(); // recargamos para ver el cambio
}

async function borrar(id) {
  if (!confirm('¿Seguro que quieres borrar esta solicitud?')) return;
  await fetch('/api/solicitudes/' + id, { method: 'DELETE' });
  cargarSolicitudes();
}

// ----------------------------------------------------------------------------
//  Arranque
// ----------------------------------------------------------------------------
construirFiltros();
cargarSolicitudes();
