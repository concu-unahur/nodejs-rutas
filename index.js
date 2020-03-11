const fs = require('fs');
const MapQuest = require('./lib/map_quest');

const api = new MapQuest('SIDB6cYO7U1HSQmLWnJgsZyGxujuUAPc');

function escribirJSON(archivo, objeto) {
  fs.writeFileSync(archivo, JSON.stringify(objeto, undefined, 2));
}

// Versión con callback (tres parámetros)
api.obtenerRutaCallback(
  'Casullo 1000, Morón, Buenos Aires',
  'Universidad Nacional de Hurlingham',
  (err, ruta) => {
    if (err) {
      throw err;
    }

    console.log('Guardando ruta en archivo (via callback)...');
    escribirJSON('ruta-callback.json', ruta);
  }
);

// Versión promise (dos parámetros)
api
  .obtenerRutaPromise(
    'Casullo 1000, Morón, Buenos Aires',
    'Universidad Nacional de Hurlingham'
  )
  .then(ruta => {
    console.log('Guardando ruta en archivo (via promise)...');
    escribirJSON('ruta-promise.json', ruta);
  })
  .catch(err => {
    throw err;
  });
