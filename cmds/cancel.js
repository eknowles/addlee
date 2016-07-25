'use strict';

let rp = require('request-promise');
let lib = require('../lib');
let Table = require('cli-table');

const SANDBOX_URL = 'https://sandbox.api.addisonlee.com/api/v2-sandbox/quickbook/booking/cancel';
const LIVE_URL = 'https://api.addisonlee.com/api/v2/quickbook/booking/cancel';

module.exports = program => {
  return program
    .description('Cancel a booking')
    .command('cancel <jobId>')
    .option('-k, --key <apikey>', 'Set API Key')
    .option('-s, --sandbox', 'Use the sandbox env of MuleSoft')
    .action(function (locations, pr) {
      const API_KEY = pr.apikey ? pr.apikey : pr.parent.config.get('apikey');
      const URL = pr.sandbox ? SANDBOX_URL : LIVE_URL;
    });
};
