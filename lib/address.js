'use strict';

var rp = require('request-promise');

/**
 * @param postcodes
 * @returns {*[]}
 */
exports.getLatLongFromPostcodes = function (postcodes) {
  return rp({
    method: 'POST',
    url: 'http://api.postcodes.io/postcodes',
    body: { postcodes: postcodes },
    json: true,
    resolveWithFullResponse: true
  }).then(function (response) {
    var x = response.body.result
      .map(function (o) {
        return o.result;
      })
      .map(function (o) {
        return {
          lat: o.latitude,
          long: o.longitude
        }
      });
    return x;
  }).catch(function (err) {
    return [];
  });

};
