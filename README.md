# Nuestra Pandilla 🧑‍🤝‍🧑

Una pequeña página web recreativa con los perfiles de tu grupo de amigos.
Cada perfil tiene un formulario donde se pueden dejar "solicitudes", y hay una
bandeja privada para revisarlas y deliberar.

## Cómo ponerla en marcha (solo la primera vez)

Necesitas tener instalado **Node.js** (descárgalo de https://nodejs.org si no lo tienes).

1. Abre la carpeta del proyecto en VS Code.
2. Abre la terminal integrada (menú `Terminal > Nueva terminal`).
3. Instala la única librería que se usa (Express):

   ```
   npm install
   ```

## Cada vez que quieras usarla

1. En la terminal, dentro de la carpeta, escribe:

   ```
   npm start
   ```

2. Verás un mensaje diciendo que el servidor está en marcha.
3. Abre el navegador en:  **http://localhost:3000**
4. Para detener el servidor: pulsa `Ctrl + C` en la terminal.

> Nota: aquí NO uses "Go Live". Como hay un servidor propio (server.js),
> la página se sirve desde él, no desde Live Server.

## Cómo personalizarla

- **Editar a los amigos** (nombres, descripción, viajes, contacto, colores):
  abre `public/datos.js`. Está todo explicado ahí dentro.

- **Poner fotos reales**: mete tus imágenes en una carpeta `public/fotos/` y en
  `datos.js` pon, por ejemplo, `foto: "fotos/ana.jpg"` en vez de `foto: null`.

- **Cambiar los colores del tema**: abre `public/estilos.css` y toca las
  variables de arriba (`:root`).

## Dónde se guardan las solicitudes

En el archivo `data/solicitudes.json`. Puedes abrirlo para verlas en crudo,
o usar la página de bandeja (enlace "zona privada" en el pie de la web).

## Estructura del proyecto

```
nuestra-pandilla/
├── package.json          configuración del proyecto y librerías
├── server.js             el servidor (Node + Express) y la API
├── data/
│   └── solicitudes.json  aquí se guardan las solicitudes
└── public/               todo lo que ve el navegador
    ├── index.html        lista de perfiles
    ├── index.js
    ├── perfil.html       página individual de cada amigo
    ├── perfil.js
    ├── bandeja.html      zona privada para deliberar
    ├── bandeja.js
    ├── datos.js          LOS DATOS DE TUS AMIGOS (edita aquí)
    └── estilos.css       todos los estilos
```
