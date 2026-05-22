// ============================================================================
//  Pagina principal: construye la lista de perfiles
// ============================================================================

// Pone el año actual en el pie
document.getElementById('anio').textContent = new Date().getFullYear();

const contenedorLista = document.getElementById('lista');

// Devuelve el HTML del avatar: una foto si existe, o un div con iniciales
function dibujarAvatar(amigo, claseExtra = '') {
  if (amigo.foto) {
    return `<div class="avatar ${claseExtra}" style="background:${amigo.color}"><img src="${amigo.foto}" alt="${amigo.nombre}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;"></div>`;
  }
  return `<div class="avatar ${claseExtra}" style="background:${amigo.color}">${amigo.iniciales}</div>`;
}

// Recorremos cada amigo del array AMIGOS (definido en datos.js)
AMIGOS.forEach((amigo, indice) => {
  // Creamos un enlace que lleva a la pagina del amigo, pasando su id en la URL
  const enlace = document.createElement('a');
  enlace.className = 'perfil-link';
  enlace.href = `perfil.html?id=${amigo.id}`;
  // animacion escalonada: cada tarjeta entra un poco despues
  enlace.style.animationDelay = (indice * 0.08) + 's';

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
