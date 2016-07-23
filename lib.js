'use strict';

let rp = require('request-promise');

module.exports = {

  log: function (msg) {
    console.log(msg);
  },

  exit: function (_code) {
    this.log(`Exit with code '${_code}'`);
    process.exit(_code);
  },

  request: function (options) {
    return rp(options);
  },

  /**
   * Convert an array of postcodes into an array of {lat, long} objects
   * @param postcodes Array of postcodes like ['w60tb', 'w1a4ps', 'rh104pw']
   * @returns {Promise.<T>}
   */
  getLocations: function (postcodes) {
    const POSTCODE_URL = 'http://api.postcodes.io/postcodes';
    const OPTIONS = {
      method: 'POST',
      url: POSTCODE_URL,
      body: { postcodes: postcodes },
      json: true,
      headers: {
        'content-type': 'application/json'
      },
    };
    return this.request(OPTIONS)
      .then(response => {
        return response.result.map(o => o.result).map(o => {
          return { lat: o.latitude, long: o.longitude };
        });
      })
      .catch(err => []);
  }
};
