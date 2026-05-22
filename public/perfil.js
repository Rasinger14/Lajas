// ============================================================================
//  Pagina individual de un amigo
// ============================================================================

// 1) Leemos el "id" de la direccion. Si la URL es  perfil.html?id=ana
//    entonces  idAmigo  valdra  "ana".
const parametros = new URLSearchParams(window.location.search);
const idAmigo = parametros.get('id');

// 2) Buscamos a ese amigo en los datos (buscarAmigo viene de datos.js)
const amigo = buscarAmigo(idAmigo);

const contenido = document.getElementById('contenido');

// 3) Si no existe (URL mal escrita), avisamos y paramos
if (!amigo) {
  contenido.innerHTML = '<p class="vacio">No encontramos ese perfil. 🤔</p>';
} else {
  pintarPerfil(amigo);
}

// ----------------------------------------------------------------------------
function avatarHTML(amigo) {
  if (amigo.foto) {
    return `<div class="avatar" style="background:${amigo.color}"><img src="${amigo.foto}" alt="${amigo.nombre}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;"></div>`;
  }
  return `<div class="avatar" style="background:${amigo.color}">${amigo.iniciales}</div>`;
}

function pintarPerfil(amigo) {
  document.title = amigo.nombre + ' · Nuestra Pandilla';

  // Convertimos la lista de viajes en "chips"
  const viajesHTML = amigo.viajes.map(v => `<span>${v}</span>`).join('');

  contenido.innerHTML = `
    <div class="cabecera-perfil">
      ${avatarHTML(amigo)}
      <div>
        <h1>${amigo.nombre}</h1>
        <div class="rol">${amigo.rol}</div>
      </div>
    </div>

    <div class="bloque">
      <h3>Cómo es</h3>
      <p class="descripcion">${amigo.descripcion}</p>
    </div>

    <div class="bloque">
      <h3>Por dónde ha andado</h3>
      <div class="chips">${viajesHTML}</div>
    </div>

    <div class="bloque">
      <h3>Contacto directo</h3>
      <p class="descripcion">📧 ${amigo.contacto}</p>
    </div>

    <!-- ================= FORMULARIO "¿TE INTERESA?" ================= -->
    <div class="bloque formulario">
      <h3>¿Te interesa salir con ${amigo.nombre.split(' ')[0]}? 👀</h3>
      <p class="descripcion">
        Deja tus datos y un mensajito. ${amigo.nombre.split(' ')[0]} lo revisará
        y deliberará con calma. (Esto es 100% recreativo, ¿eh?)
      </p>

      <label for="nombre">Tu nombre</label>
      <input type="text" id="nombre" placeholder="¿Cómo te llamas?">

      <label for="contacto">Tu contacto (Instagram, teléfono, email...)</label>
      <input type="text" id="contacto" placeholder="@tuusuario / 600 000 000">

      <label for="mensaje">Un mensaje (opcional)</label>
      <textarea id="mensaje" placeholder="Cuéntale algo..."></textarea>

      <button class="boton" id="enviar">Enviar solicitud 💌</button>

      <div class="confirmacion" id="confirmacion"></div>
    </div>
  `;

  // Conectamos el boton de enviar
  document.getElementById('enviar').addEventListener('click', () => enviarSolicitud(amigo));
}

// ----------------------------------------------------------------------------
//  Envia la solicitud al servidor (POST /api/solicitudes)
// ----------------------------------------------------------------------------
async function enviarSolicitud(amigo) {
  const nombre = document.getElementById('nombre').value.trim();
  const contacto = document.getElementById('contacto').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const cajaConfirma = document.getElementById('confirmacion');

  // Validacion en el navegador antes de enviar
  if (!nombre || !contacto) {
    cajaConfirma.style.display = 'block';
    cajaConfirma.style.background = 'rgba(156,59,42,0.12)';
    cajaConfirma.style.color = '#9c3b2a';
    cajaConfirma.textContent = 'Pon al menos tu nombre y un contacto. 🙂';
    return;
  }

  try {
    // fetch envia la peticion al servidor. Es como una llamada a la "API".
    const respuesta = await fetch('/api/solicitudes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amigoId: amigo.id,
        amigoNombre: amigo.nombre,
        nombre,
        contacto,
        mensaje
      })
    });

    if (!respuesta.ok) throw new Error('El servidor rechazó la solicitud');

    // Exito: mostramos confirmacion y limpiamos el formulario
    cajaConfirma.style.display = 'block';
    cajaConfirma.style.background = 'rgba(31,111,92,0.12)';
    cajaConfirma.style.color = 'var(--acento-2)';
    cajaConfirma.textContent = `¡Enviado! ${amigo.nombre.split(' ')[0]} lo deliberará. 🤔`;
    document.getElementById('nombre').value = '';
    document.getElementById('contacto').value = '';
    document.getElementById('mensaje').value = '';
  } catch (error) {
    cajaConfirma.style.display = 'block';
    cajaConfirma.style.background = 'rgba(156,59,42,0.12)';
    cajaConfirma.style.color = '#9c3b2a';
    cajaConfirma.textContent = 'Ups, no se pudo enviar. ¿Está el servidor encendido?';
  }
}
