// ============================================================================
//  Pagina individual de un evento
// ============================================================================

const parametros = new URLSearchParams(window.location.search);
const idEvento = parametros.get('id');
const evento = buscarEvento(idEvento);
const contenido = document.getElementById('contenido');

if (!evento) {
  contenido.innerHTML = '<p class="vacio">No encontramos ese evento. 🤔</p>';
} else {
  pintarEvento(evento);
}

function pintarEvento(ev) {
  document.title = ev.titulo + ' · Lajas';

  const [y, m, d] = ev.fecha.split('-');
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio',
                 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const fechaLarga = `${parseInt(d)} de ${meses[parseInt(m) - 1]} de ${y}`;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaEv = new Date(ev.fecha + 'T00:00:00');
  const diff = Math.round((fechaEv - hoy) / (1000 * 60 * 60 * 24));
  const diasTexto = diff < 0 ? 'Ya pasó' : diff === 0 ? '¡Hoy!' : `En ${diff} día${diff !== 1 ? 's' : ''}`;

  contenido.innerHTML = `
    <div class="cabecera-evento">
      <div class="evento-emoji-grande" style="background:${ev.color}20; border: 2px solid ${ev.color}40">
        ${ev.emoji}
      </div>
      <div>
        <div class="rol">${ev.categoria}</div>
        <h1>${ev.titulo}</h1>
        <p class="evento-meta">📅 ${fechaLarga} &nbsp;·&nbsp; <strong style="color:${ev.color}">${diasTexto}</strong></p>
        <p class="evento-meta">📍 ${ev.lugar}</p>
      </div>
    </div>

    <div class="bloque">
      <h3>Sobre el evento</h3>
      <p class="descripcion">${ev.descripcion}</p>
    </div>

    <div class="bloque">
      <h3>Detalles</h3>
      <p class="descripcion">${ev.detalles}</p>
    </div>

    <div class="bloque formulario">
      <h3>¿Quieres participar? ✋</h3>
      <p class="descripcion">
        Deja tus datos y te avisamos cuando se confirmen los detalles del evento.
      </p>

      <label for="nombre">Tu nombre</label>
      <input type="text" id="nombre" placeholder="¿Cómo te llamas?">

      <label for="contacto">Tu contacto (Instagram, teléfono, email...)</label>
      <input type="text" id="contacto" placeholder="@tuusuario / 600 000 000">

      <label for="mensaje">Un mensaje (opcional)</label>
      <textarea id="mensaje" placeholder="¿Algo que quieras agregar?"></textarea>

      <button class="boton" id="enviar">Confirmar participación ✅</button>
      <div class="confirmacion" id="confirmacion"></div>
    </div>
  `;

  document.getElementById('enviar').addEventListener('click', () => enviarParticipacion(ev));
}

async function enviarParticipacion(ev) {
  const nombre   = document.getElementById('nombre').value.trim();
  const contacto = document.getElementById('contacto').value.trim();
  const mensaje  = document.getElementById('mensaje').value.trim();
  const caja     = document.getElementById('confirmacion');

  if (!nombre || !contacto) {
    caja.style.display = 'block';
    caja.style.background = 'rgba(156,59,42,0.12)';
    caja.style.color = '#9c3b2a';
    caja.textContent = 'Pon al menos tu nombre y un contacto. 🙂';
    return;
  }

  try {
    const resp = await fetch('/api/participaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventoId:    ev.id,
        eventoTitulo: ev.titulo,
        nombre,
        contacto,
        mensaje
      })
    });

    if (!resp.ok) throw new Error();

    caja.style.display = 'block';
    caja.style.background = 'rgba(31,111,92,0.12)';
    caja.style.color = 'var(--acento-2)';
    caja.textContent = '¡Apuntado! Te avisamos cuando haya más detalles. 🎉';
    document.getElementById('nombre').value   = '';
    document.getElementById('contacto').value = '';
    document.getElementById('mensaje').value  = '';
  } catch {
    caja.style.display = 'block';
    caja.style.background = 'rgba(156,59,42,0.12)';
    caja.style.color = '#9c3b2a';
    caja.textContent = 'Ups, no se pudo enviar. ¿Está el servidor encendido?';
  }
}
