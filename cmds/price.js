'use strict';

var request = require('request');
var address = require('../lib/address');

const SANDBOX_URL = 'https://sandbox.api.addisonlee.com/v2-sandbox/quickbook/quote/price';
const LIVE_URL = 'https://api.addisonlee.com/v2/quickbook/quote/price';

module.exports = function (program) {

  program
    .command('price [locations]')
    .option('-t, --tomorrow', 'Set the pickup time for tomorrow')
    .option('-k, --key <apikey>', 'Set the API Key for this request')
    .option('-c, --cash', 'Set the payment method to Cash')
    .option('-C, --credit-card', 'Set the payment method to Credit Card')
    .option('-s, --sandbox', 'Use the sandbox env of MuleSoft')
    .version('0.0.0')
    .description('Get a price for a journey')
    .action(function (locations, pr) {
      const LOC = locations || 'NW13ER,TW61EW';
      const URL = pr.sandbox ? SANDBOX_URL : LIVE_URL;
      const QUOTE = {
        locations: [],
        payment_method: 'Account',
        services: [
          { code: 'OneFourPassengers' }
        ]
      };

      address.getLatLongFromPostcodes(LOC.split(','));

    });
};
