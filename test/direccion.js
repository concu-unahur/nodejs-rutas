const MapQuest = require('../lib/map_quest');

const api = new MapQuest('poner acá el api key');
const direccion = process.argv[2];

api
  .obtenerLugarPromise(direccion)
  .then(lugar => {
    console.log('¡Dirección válida!\nComprobá que la ciudad (adminArea5) y provincia (adminArea3) sean las que vos pensaste:');
    console.log(lugar);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

