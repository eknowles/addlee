'use strict';

var rp = require('request-promise');

/**
 * @param postcodes
 * @returns {*[]}
 */
exports.getLatLongFromPostcodes = function (postcodes) {
  return rp({ method: 'POST', url: 'http://api.postcodes.io/postcodes', body: { postcodes: postcodes }, json: true, })
    .then(function (response) {
      return response.result
        .map(function (o) {
          return o.result;
        })
        .map(function (o) {
          return {
            lat: o.latitude,
            long: o.longitude
          }
        });
    }).catch(function (err) {
      return [];
    });
};
