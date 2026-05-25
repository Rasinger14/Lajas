// ============================================================================
//  SERVIDOR  (Node.js + Express)
// ============================================================================
//  ¿Qué hace este archivo?
//    1. Sirve las paginas web (los archivos de la carpeta /public).
//    2. Ofrece una pequeña "API": unas direcciones (/api/...) que el navegador
//       llama para guardar y leer las solicitudes que deja la gente.
//    3. Guarda esas solicitudes en el archivo data/solicitudes.json
//       (asi persisten aunque cierres el servidor y lo vuelvas a abrir).
//
//  Para arrancarlo:  npm install   (una sola vez)  y luego   npm start
//  Despues abre en el navegador:   http://localhost:3000
// ============================================================================

const express = require('express');   // el framework del servidor
const fs = require('fs');             // para leer/escribir archivos
const path = require('path');         // para construir rutas de archivos

const app = express();
const PUERTO = 3000;

const ARCHIVO_DATOS           = path.join(__dirname, 'data', 'solicitudes.json');
const ARCHIVO_PARTICIPACIONES = path.join(__dirname, 'data', 'participaciones.json');

// ----------------------------------------------------------------------------
//  Funciones auxiliares para leer y escribir el JSON
// ----------------------------------------------------------------------------
function leerSolicitudes() {
  // Si el archivo no existe todavia, devolvemos una lista vacia.
  if (!fs.existsSync(ARCHIVO_DATOS)) return [];
  const contenido = fs.readFileSync(ARCHIVO_DATOS, 'utf-8');
  try {
    return JSON.parse(contenido);
  } catch {
    return []; // por si el archivo se corrompe, no rompemos el servidor
  }
}

function guardarSolicitudes(lista) {
  // null, 2 = guarda el JSON "bonito" e indentado, facil de leer a mano
  fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(lista, null, 2));
}

// ----------------------------------------------------------------------------
//  Configuracion
// ----------------------------------------------------------------------------
app.use(express.json());                              // entender JSON en las peticiones
app.use(express.static(path.join(__dirname, 'public'))); // servir las paginas

// ============================================================================
//  API
// ============================================================================

// GET /api/solicitudes  ->  devuelve TODAS las solicitudes (para la bandeja)
app.get('/api/solicitudes', (req, res) => {
  res.json(leerSolicitudes());
});

// POST /api/solicitudes ->  guarda una solicitud nueva
//   El navegador envia: { amigoId, amigoNombre, nombre, contacto, mensaje }
app.post('/api/solicitudes', (req, res) => {
  const { amigoId, amigoNombre, nombre, contacto, mensaje } = req.body;

  // Validacion minima: nombre y contacto son obligatorios
  if (!nombre || !contacto) {
    return res.status(400).json({ error: 'Faltan el nombre o el contacto.' });
  }

  const solicitudes = leerSolicitudes();
  const nueva = {
    id: Date.now(),                 // un id unico sencillo (la hora en ms)
    amigoId,
    amigoNombre,
    nombre,
    contacto,
    mensaje: mensaje || '',
    estado: 'pendiente',            // pendiente | aceptada | rechazada
    fecha: new Date().toISOString()
  };
  solicitudes.push(nueva);
  guardarSolicitudes(solicitudes);

  res.status(201).json(nueva);
});

// PATCH /api/solicitudes/:id  ->  cambia el estado (aceptar / rechazar)
//   El navegador envia: { estado: "aceptada" }  (por ejemplo)
app.patch('/api/solicitudes/:id', (req, res) => {
  const id = Number(req.params.id);
  const { estado } = req.body;
  const solicitudes = leerSolicitudes();
  const solicitud = solicitudes.find(s => s.id === id);

  if (!solicitud) return res.status(404).json({ error: 'No encontrada.' });

  solicitud.estado = estado;
  guardarSolicitudes(solicitudes);
  res.json(solicitud);
});

// DELETE /api/solicitudes/:id  ->  borra una solicitud
app.delete('/api/solicitudes/:id', (req, res) => {
  const id = Number(req.params.id);
  let solicitudes = leerSolicitudes();
  solicitudes = solicitudes.filter(s => s.id !== id);
  guardarSolicitudes(solicitudes);
  res.json({ ok: true });
});

// ============================================================================
//  API — PARTICIPACIONES EN EVENTOS
// ============================================================================

function leerParticipaciones() {
  if (!fs.existsSync(ARCHIVO_PARTICIPACIONES)) return [];
  const c = fs.readFileSync(ARCHIVO_PARTICIPACIONES, 'utf-8');
  try { return JSON.parse(c); } catch { return []; }
}

function guardarParticipaciones(lista) {
  fs.writeFileSync(ARCHIVO_PARTICIPACIONES, JSON.stringify(lista, null, 2));
}

app.get('/api/participaciones', (req, res) => {
  res.json(leerParticipaciones());
});

app.post('/api/participaciones', (req, res) => {
  const { eventoId, eventoTitulo, nombre, contacto, mensaje } = req.body;
  if (!nombre || !contacto) {
    return res.status(400).json({ error: 'Faltan nombre o contacto.' });
  }
  const lista = leerParticipaciones();
  const nueva = {
    id: Date.now(),
    eventoId,
    eventoTitulo,
    nombre,
    contacto,
    mensaje: mensaje || '',
    fecha: new Date().toISOString()
  };
  lista.push(nueva);
  guardarParticipaciones(lista);
  res.status(201).json(nueva);
});

app.delete('/api/participaciones/:id', (req, res) => {
  const id = Number(req.params.id);
  const lista = leerParticipaciones().filter(p => p.id !== id);
  guardarParticipaciones(lista);
  res.json({ ok: true });
});

// ============================================================================
//  API — TRIPS (lee las carpetas de fotos dinámicamente)
// ============================================================================
app.get('/api/trips', (req, res) => {
  const carpetaFotos = path.join(__dirname, 'public', 'fotos');
  const IMAGENES = /\.(jpe?g|png|gif|webp)$/i;
  const VIDEOS   = /\.(mp4|mov|webm)$/i;

  const entradas = fs.readdirSync(carpetaFotos, { withFileTypes: true });
  const trips = entradas
    .filter(e => e.isDirectory())
    .map(dir => {
      const archivos = fs.readdirSync(path.join(carpetaFotos, dir.name))
        .filter(f => IMAGENES.test(f) || VIDEOS.test(f))
        .map(f => ({
          nombre: f,
          tipo: IMAGENES.test(f) ? 'imagen' : 'video',
          url: `/fotos/${encodeURIComponent(dir.name)}/${encodeURIComponent(f)}`
        }));
      const portada = archivos.find(a => a.tipo === 'imagen') || null;
      return { nombre: dir.name, portada: portada ? portada.url : null, archivos };
    });

  res.json(trips);
});

// ----------------------------------------------------------------------------
//  Arrancar el servidor
// ----------------------------------------------------------------------------
app.listen(PUERTO, () => {
  console.log('===========================================');
  console.log('  Servidor en marcha!');
  console.log('  Abre en el navegador:  http://localhost:' + PUERTO);
  console.log('  (para detenerlo: Ctrl + C)');
  console.log('===========================================');
});
