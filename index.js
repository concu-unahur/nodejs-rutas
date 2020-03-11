const fs = require('fs')
const MapQuest = require('./lib/map_quest');

const api = new MapQuest('SIDB6cYO7U1HSQmLWnJgsZyGxujuUAPc');

api.obtenerRuta(
  'Casullo 1034, Morón, Buenos Aires',
  'Universidad Nacional de Hurlingham',
  (err, direcciones) => {
    if (err) {
      throw err;
    }

    console.log('Guardando ruta en archivo...')
    fs.writeFileSync('ruta.json', JSON.stringify(direcciones, undefined, 2))      
  }
);
