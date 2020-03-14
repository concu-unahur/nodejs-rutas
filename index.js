const MapQuest = require('./lib/map_quest');

const api = new MapQuest('SIDB6cYO7U1HSQmLWnJgsZyGxujuUAPc');

// Versión con callback (tres parámetros)
api.obtenerRutaCallback(
  'Casullo 1000, Morón, Buenos Aires',
  'Universidad Nacional de Hurlingham',
  (err, ruta) => {
    if (err) {
      throw err;
    }

    console.log('Obtenida ruta (via callback)...');
    console.log(ruta);
  }
);

// Versión promise (dos parámetros)
api
  .obtenerRutaPromise(
    'Casullo 1000, Morón, Buenos Aires',
    'Universidad Nacional de Hurlingham'
  )
  .then(ruta => {
    console.log('Obtenida ruta (via promise)...');
    console.log(ruta);
  })
  .catch(err => {
    throw err;
  });
