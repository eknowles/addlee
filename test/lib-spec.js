/* global describe, it */
'use strict';

var assert = require('assert');
var lib = require('../lib');

describe('lib', () => {
  describe('getLocations', () => {
    it('should return an array of postcodes', function (done) {
      this.timeout(10000);
      lib.getLocations(['w60tb', 'nw13er'])
        .then(output => {
          assert.equal(output.length, 2);
          output.forEach(i => {
            assert.equal(i.hasOwnProperty('long'), true);
            assert.equal(typeof i.lat, 'number');
          });
          done();
        });
    });

    it('should return an empty array of postcodes when given bad data', function (done) {
      this.timeout(10000);
      lib.getLocations(['x', 'y'])
        .then(output => {
          console.log(output);
          assert.deepEqual(output.length, 0);
          done();
        });
    });
  });
});
