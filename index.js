const superagent = require('superagent');
const fs = require('fs');

const urlBase = 'http://open.mapquestapi.com/directions/v2/route'

const defaultOptions = {
  locale: 'es_MX',
  unit: 'k',
  enhancedNarrative: true,
  key: 'SIDB6cYO7U1HSQmLWnJgsZyGxujuUAPc'
};

const query = {
  from: 'Casullo 1034, Morón, Buenos Aires',
  to: 'Universidad Nacional de Hurlingham'
}

superagent
  .get(urlBase)
  .query({ ...defaultOptions, ...query })
  .end((err, res) => {

    const info = res.body.info;
    if (info.statuscode > 0) {
      throw new Error(info.messages.join('\n'))
    }

    fs.writeFileSync('ruta.json', JSON.stringify(res.body, undefined, 2));

  })
