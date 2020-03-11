const superagent = require('superagent');

const urlBase = 'http://open.mapquestapi.com/directions/v2/route';

const defaultOptions = {
  locale: 'es_MX',
  unit: 'k',
  enhancedNarrative: true
};

module.exports = 
  class MapQuest {
    constructor(key) {
      this.key = key;
    }

    obtenerRuta(desde, hasta, callback) {
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

          callback(null, res.body);
        });
    }
  }
