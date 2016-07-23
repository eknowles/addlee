/* global describe, it */
'use strict';

var assert = require('assert');
var exec = require('child_process').exec;
var path = require('path');

describe('price', function () {
  var cmd = 'node ' + path.join(__dirname, '../bin/addlee') + ' price ';
  console.log(cmd);

  it('should return json', function (done) {
    this.timeout(10000);

    exec(cmd + 'nw13er,w60tb', function (error, stdout, stderr) {
      console.log(stdout);
      assert(stdout);
      done();
    });
  });
});
