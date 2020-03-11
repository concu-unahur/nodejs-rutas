const superagent = require('superagent');

const urlBase = 'http://open.mapquestapi.com/directions/v2/route';

const defaultOptions = {
  locale: 'es',
  unit: 'k',
  enhancedNarrative: true
};

class MapQuest {
  constructor(key) {
    this.key = key;
  }

  obtenerRutaCallback(desde, hasta, callback) {
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
