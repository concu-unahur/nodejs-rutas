const superagent = require('superagent');
const { azul } = require('./colores');

const urlBase = 'http://open.mapquestapi.com/directions/v2/route';

const defaultOptions = {
  locale: 'es',
  unit: 'k',
  enhancedNarrative: true
};

const debugLog = texto => console.log(azul(`[MapQuest] ${texto}`));

class MapQuest {
  constructor(key) {
    this.key = key;
  }

  obtenerLugarCallback(direccion, callback) {
    debugLog(`Buscando información de ${direccion}...`)
    return superagent
      .get('http://open.mapquestapi.com/geocoding/v1/address')
      .query({ key: this.key, location: direccion })
      .end((err, res) => {
        if (err) {
          return callback(err);
        }

        const info = res.body.info;
        if (info.statuscode > 0) {
          return callback(new Error(info.messages.join('\n')));
        }

        callback(null, res.body.results[0].locations[0]);
      });
  }

  obtenerLugarPromise(direccion) {
    debugLog(`Buscando información de ${direccion}...`)
    return superagent
      .get('http://open.mapquestapi.com/geocoding/v1/address')
      .query({ key: this.key, location: direccion })
      .then(res => {
        const info = res.body.info;
        if (info.statuscode > 0) {
          return Promise.reject(new Error(info.messages.join('\n')));
        }

        return res.body.results[0].locations[0]
      });
  }

  obtenerRutaCallback(desde, hasta, callback) {
    debugLog(`Buscando ruta desde ${desde} hasta ${hasta}...`);
    superagent
      .get(urlBase)
      .query({ ...defaultOptions, key: this.key, from: desde, to: hasta })
      .end((err, res) => {
        if (err) {
          return callback(err);
        }

        const info = res.body.info;
        if (info.statuscode > 0) {
          return callback(new Error(info.messages.join('\n')));
        }

        callback(null, res.body.route.legs[0]);
      });
  }

  obtenerRutaPromise(desde, hasta) {
    debugLog(`Buscando ruta desde ${desde} hasta ${hasta}...`)
    return superagent
      .get(urlBase)
      .query({ ...defaultOptions, key: this.key, from: desde, to: hasta })
      .then(res => {
        const info = res.body.info;
        if (info.statuscode > 0) {
          return Promise.reject(new Error(info.messages.join('\n')));
        }

        return res.body.route.legs[0];
      });    
  }
}

module.exports = MapQuest;
