'use strict';

let rp = require('request-promise');
let lib = require('../lib');
let Table = require('cli-table');

module.exports = program => {
  return program
    .description('Cancel a booking')
    .command('cancel <jobId>')
    .option('-k, --key <apikey>', 'Set API Key')
    .option('-s, --sandbox', 'Use the sandbox env of MuleSoft')
    .action(function (jobId, pr) {
      const API_KEY = pr.apikey ? pr.apikey : pr.parent.config.get('apikey');
      lib.cancelBooking(jobId, Boolean(pr.sandbox), API_KEY)
        .then(res => {
          lib.log(res);
        })
        .catch(err => {
          lib.log(err.error);
        });
    });
};
