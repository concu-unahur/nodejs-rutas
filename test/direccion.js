const MapQuest = require('../lib/map_quest');

const api = new MapQuest('SIDB6cYO7U1HSQmLWnJgsZyGxujuUAPc');
const direccion = process.argv[2];

api
  .obtenerLugarPromise(direccion)
  .then(lugar => {
    console.log('¡Dirección válida!');
    console.log(lugar);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

