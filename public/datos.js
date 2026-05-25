// ============================================================================
//  DATOS DE LAS LAJAS
// ============================================================================

const AMIGOS = [
  {
    id: "agustine",
    nombre: "Agustin Espino",
    iniciales: "AE",
    foto: "fotos/Agustin.png",
    rol: "Piloto de Copa Airlines",
    color: "#2563EB",
    descripcion: "Este man se la pasa en el aire literalmente. Piloto de Copa, o sea que si vas a volar a algún lado existe la posibilidad de que él sea quien te lleve. Siempre anda con ese pinta de piloto aunque esté en chanclas. Le encanta recordarte que vuela aviones como si uno se fuera a olvidar.",
    viajes: ["✈️ Donde Copa llegue", "🌎 Todo el continente"],
    contacto: ""
  },
  {
    id: "andres",
    nombre: "Andres Garrido",
    iniciales: "AG",
    foto: "fotos/Andy.png",
    rol: "Lic. Computer Science",
    color: "#059669",
    descripcion: "El más nerd del grupo y él lo sabe. Habla de cosas que nadie entiende y no le importa. Si algo tecnológico se rompe lo llamas a él, aunque lo que sea que diga de respuesta probablemente tampoco lo vayas a entender. Duerme tarde, se despierta tarde y aun así te hace sentir que tú eres el que está perdiendo el tiempo.",
    viajes: [],
    contacto: ""
  },
  {
    id: "angel",
    nombre: "Angel De Bello",
    iniciales: "ADB",
    foto: "fotos/Ane.png",
    rol: "Ing. Comercial",
    color: "#D97706",
    descripcion: "Este man siempre está pensando en cómo hacer plata. Tiene ideas de negocios todo el tiempo, algunas buenas, otras locas, pero te las vende todas con la misma confianza. El que siempre analiza cuánto costó la salida y cómo se pudo haber ahorrado.",
    viajes: [],
    contacto: ""
  },
  {
    id: "juandiego",
    nombre: "Juan Diego Cordoba",
    iniciales: "JDC",
    foto: "fotos/Cordoba.png",
    rol: "Logística Internacional · Ing. Industrial",
    color: "#7C3AED",
    descripcion: "Dos carreras. Dos. Mientras tú hacías una, él hizo dos. Nadie del grupo sabe exactamente a qué se dedica pero cuando lo explica suena importante. El más organizado de todos por mucho, probablemente tiene la salida del sábado planificada desde el miércoles.",
    viajes: [],
    contacto: ""
  },
  {
    id: "elias",
    nombre: "Elias Effio",
    iniciales: "EE",
    foto: "fotos/Eliel.png",
    rol: "Piloto de Barcos",
    color: "#0891B2",
    descripcion: "Piloto de barcos. No aviones, barcos. Le preguntas si es lo mismo que ser marinero y se ofende. Tiene ese aire de man que ha visto cosas en alta mar que tú no puedes ni imaginar. El complemento perfecto de Agustin e Ian Carlo, esos cubren el aire y él cubre el agua.",
    viajes: ["⚓ Alta mar", "🌊 Donde el mar lo lleve"],
    contacto: ""
  },
  {
    id: "felipe",
    nombre: "Felipe Tristan",
    iniciales: "FT",
    foto: "fotos/Felipe.png",
    rol: "???",
    color: "#DC2626",
    descripcion: "Nadie sabe qué verga estudia este man. Se le ha preguntado múltiples veces y la respuesta siempre es confusa o cambia. A estas alturas ya es parte del misterio que lo define. Lo que sí se sabe es que siempre está en los planes y que de alguna forma la pasa bien.",
    viajes: [],
    contacto: ""
  },
  {
    id: "fernandoa",
    nombre: "Fernando Arauz",
    iniciales: "FA",
    foto: "fotos/Fernando.png",
    rol: "Lic. Comunicación Social",
    color: "#EA580C",
    descripcion: "Este man sabe cómo decir todo mejor que tú. Comunicación Social y se nota, nunca lo vas a ganar en un argumento porque siempre encuentra las palabras exactas. El que documenta todo del grupo, si hay una historia que contar, él la cuenta bien.",
    viajes: [],
    contacto: ""
  },
  {
    id: "ramses",
    nombre: "Ramses Cajar",
    iniciales: "RC",
    foto: "fotos/Ik.png",
    rol: "Ing. Mecánico",
    color: "#475569",
    descripcion: "Si tu carro hace un ruido raro, llamas a Ramses. Ya sabe qué es antes de que termines de describir el sonido. Ingeniero mecánico de verdad, no de los que estudian eso y luego no saben ni cambiar una llanta. Tranquilo la mayoría del tiempo pero cuando habla de motores se transforma.",
    viajes: [],
    contacto: ""
  },
  {
    id: "iancarlo",
    nombre: "Ian Carlo Garcia",
    iniciales: "ICG",
    foto: "fotos/JC.png",
    rol: "Piloto de Copa Airlines",
    color: "#1D4ED8",
    descripcion: "El otro piloto del grupo. Sí, hay dos. Junto con Agustin básicamente controlan los cielos panameños. Tiene ese vibe calmado que tienen todos los pilotos como si nada les afectara, lo cual da confianza hasta que te das cuenta que eso también lo tienen cuando están parchando.",
    viajes: ["✈️ Donde Copa llegue", "🌎 Todo el continente"],
    contacto: ""
  },
  {
    id: "josiel",
    nombre: "Josiel Zarate",
    iniciales: "JZ",
    foto: "fotos/Josiel.png",
    rol: "Lic. Marítimo y Portuario",
    color: "#065F46",
    descripcion: "Sabe todo lo que entra y sale de Panamá por el mar. Si algún día necesitas saber cómo funciona un puerto, este es tu man. En tierra es completamente normal, pero menciónale algo de barcos o contenedores y se le enciende la cara.",
    viajes: ["⚓ Puertos del mundo"],
    contacto: ""
  },
  {
    id: "rafael",
    nombre: "Rafael Lambraño",
    iniciales: "RL",
    foto: "fotos/Lambrano.png",
    rol: "Médico",
    color: "#BE123C",
    descripcion: "El médico del grupo, o sea el que todos joden a las 11pm con síntomas raros de Google. Lo aguanta con una paciencia que claramente entrenó en la carrera. Sobrevivió medicina, lo cual ya lo convierte en alguien que ha sufrido más que tú y te lo puede refregar en cara cuando quiera.",
    viajes: [],
    contacto: ""
  },
  {
    id: "rolando",
    nombre: "Rolando Gonzalez",
    iniciales: "RG",
    foto: "fotos/Rolando.png",
    rol: "Ing. Civil",
    color: "#92400E",
    descripcion: "Ingeniero civil. Ve un edificio y ya sabe si está bien hecho o no. Tiene opiniones sobre construcciones que nadie más en el grupo puede debatir. Con Agustin González forman el dúo de ingenieros civiles, y cuando están juntos la conversación técnica que tienen no la entiende nadie más.",
    viajes: [],
    contacto: ""
  },
  {
    id: "agustingg",
    nombre: "Agustin Gonzalez",
    iniciales: "AG",
    foto: "fotos/Tincito.png",
    rol: "Ing. Civil",
    color: "#4338CA",
    descripcion: "El otro ingeniero civil. Hay dos Agustines en el grupo y los dos son ingenieros civiles, cosa que es bastante cómica. Este y Rolando comparten carrera y probablemente se han debatido cosas que el resto del grupo escucha sin entender nada. Buen man.",
    viajes: [],
    contacto: ""
  },
  {
    id: "alexis",
    nombre: "Alexis Arauz",
    iniciales: "AA",
    foto: "fotos/Alexis.png",
    rol: "Ing. Sistemas · Investigador",
    color: "#0F766E",
    descripcion: "No solo estudió sistemas sino que investiga. Hay una diferencia entre saber programar y investigar tecnología, y este man hace lo segundo. El más académico del grupo con diferencia. Siempre tiene una respuesta bien argumentada para todo lo cual puede ser impresionante o desesperante dependiendo del día.",
    viajes: [],
    contacto: ""
  },
  {
    id: "barreto",
    nombre: "Jose Ignacio Barreto",
    iniciales: "BA",
    foto: "fotos/Barreto.png",
    rol: "Lic. Computer Science",
    color: "#7C2D92",
    descripcion: "El otro de Computer Science del grupo. Él y Andres son el dúo tecnológico, aunque probablemente cada uno tiene sus opiniones bien fijas sobre cómo se hacen las cosas y no se las ceden al otro. Cuando están juntos hablando de código el resto del grupo solo puede asentir.",
    viajes: [],
    contacto: ""
  }
];

// Pequeña ayuda para encontrar un amigo por su id (la usan las paginas)
function buscarAmigo(id) {
  return AMIGOS.find(a => a.id === id);
}

// ===========================================================================
//  TRIPS
//  Para agregar un trip, añade un objeto a este array con la estructura:
//  {
//    id: "nombre-unico",
//    titulo: "Titulo del trip",
//    fecha: "2024-08-01",          // formato YYYY-MM-DD
//    descripcion: "...",
//    portada: "fotos/trips/x.jpg", // o null si no hay foto
//    fotos: [],                    // array de paths a fotos adicionales
//    video: null                   // ID de YouTube o null
//  }
// ===========================================================================
const TRIPS = [];

// ===========================================================================
//  FUTUROS EVENTOS
// ===========================================================================
const EVENTOS = [
  {
    id: "cumple-tincito-2026",
    titulo: "Cumpleaños de Tincito",
    fecha: "2026-06-12",
    emoji: "🎂",
    categoria: "Cumpleaños",
    lugar: "Por confirmar",
    descripcion: "Lajas???????",
    detalles: "Ojalá Tincito deje la gaysada y haga lajas.",
    color: "#4338CA"
  },
  {
    id: "cumple-josiel-2026",
    titulo: "Cumpleaños de Josiel",
    fecha: "2026-07-11",
    emoji: "🎂",
    categoria: "Cumpleaños",
    lugar: "Por confirmar",
    descripcion: "Fiesta de Cumpleaños de Josiel (probablemente bebedera infinita).",
    detalles: "Ubicación por confirmar, pero de seguro bebedera asegurada no importa dónde.",
    color: "#065F46"
  },
  {
    id: "agosto-2026",
    titulo: "Agosto — Cumpleaños de Angel, Cordoba, Fernando",
    fecha: "2026-08-01",
    emoji: "🎉",
    categoria: "Cumpleaños",
    lugar: "Todo Agosto",
    descripcion: "Preparense para gastar. El mes más caro siempre en todos los años. Bebedera absoluta como siempre. Vagancia descontrolada hasta el fin y más allá.",
    detalles: "Preparense para estar el mes completo de aquí para allá solo pensando en si voy a beber más que el día anterior. Todo Agosto, desde el 1ero hasta el 31, extendible a septiembre también.",
    color: "#D97706"
  },
  {
    id: "cumple-lambrano-2026",
    titulo: "Cumpleaños de Lambraño",
    fecha: "2026-09-12",
    emoji: "🎂",
    categoria: "Cumpleaños",
    lugar: "Por confirmar",
    descripcion: "No es necesario especificar, lo más probable es que todo el mundo quede hasta la verga. Beber, beber y más beber.",
    detalles: "Todo tipo de alcohol.",
    color: "#BE123C"
  },
  {
    id: "tin-yatch-party-2026",
    titulo: "Tin Yatch Party",
    fecha: "2026-10-16",
    emoji: "🛥️",
    categoria: "Evento",
    lugar: "El yate de Tin",
    descripcion: "Si eres gyal tienes que besar a Agustin pa poder subir al yate, si besas mal NO VAS, TE QUEDASTE. Si eres fren relajao. (Cordoba en la cuerda floja si no consigue un grupo de 10 mujeres todas modelos Miss Universo).",
    detalles: "Alcohol, música, fiesta, sustancias ilícitas, relaciones íntimas prematrimoniales, etc. Fin de semana del 16 completo.",
    color: "#0891B2"
  }
];

function buscarEvento(id) {
  return EVENTOS.find(e => e.id === id);
}
