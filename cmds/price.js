'use strict';

let rp = require('request-promise');
let lib = require('../lib');
let Table = require('cli-table');

const SANDBOX_URL = 'https://sandbox.api.addisonlee.com/api/v2-sandbox/quickbook/quote/price';
const LIVE_URL = 'https://api.addisonlee.com/api/v2/quickbook/quote/price';

module.exports = program => {
  return program
    .description('Get a price for a journey')
    .command('price [locations]')
    .option('-t, --tomorrow', 'Set pickup time for tomorrow')
    .option('-T, --table', 'Print output as a table')
    .option('-p, --promo [promo]', 'Set Promo Code')
    .option('-k, --key <apikey>', 'Set API Key')
    .option('-S, --service <service>', 'Set service type for the quote', 'OneFourPassengers', /^(OneFourPassengers|FiveSixPassengers|Prius|VipE)$/i)
    .option('-c, --cash', 'Set payment method to Cash')
    .option('-C, --credit-card', 'Set payment method to Credit Card')
    .option('-s, --sandbox', 'Use the sandbox env of MuleSoft')
    .action(function (locations, pr) {
      const LOC = locations || pr.parent.config.get('defaultLocations');
      const URL = pr.sandbox ? SANDBOX_URL : LIVE_URL;
      const API_KEY = pr.apikey ? pr.apikey : pr.parent.config.get('apikey');
      let quote = {};
      quote.payment_method = 'Account';
      quote.services = [{ code: pr.service }];

      if (!LOC) {
        lib.log(`Missing locations argument. Include the argument in the query or persist a default in the config using\n\n  $ addlee config defaultLocations Nw13ER,W1A1A`);
        program.outputHelp();
        lib.exit(1);
      }

      if (pr.cash) {
        quote.payment_method = 'Cash';
      } else if (pr.creditCard) {
        quote.payment_method = 'CreditCard';
      }

      if (pr.promo) {
        quote.promo_code = pr.promo;
      }

      lib.getLocations(LOC.split(','))
        .then(res => {
          quote.locations = res;
          return getQuote({ url: URL, quote: quote, apikey: API_KEY });
        })
        .then(response => {
          if (pr.table) {
            let head = Object.keys(response.locations[0]);
            let headers = head.map(head => head.toUpperCase());
            let locationTable = new Table({ head: headers });
            let quoteTable = new Table({});

            response.locations.forEach(location => {
              let o = [];
              head.forEach(i => {
                o.push(location[i]);
              });
              locationTable.push(o);
            });

            quoteTable.push(
              { 'Request ID': response.request_id },
              { 'Quote ID': response.quotes[0].quote_id },
              { 'Service': response.quotes[0].service },
              { 'ETA': `${response.quotes[0].eta} mins` },
              { 'Discount': `${response.quotes[0].discount} ${response.quotes[0].currency}` },
              { 'VAT': `${response.quotes[0].vat} ${response.quotes[0].currency}` },
              { 'Total Price': `${response.quotes[0].total_price} ${response.quotes[0].currency}` }
            );

            // Log the Quote Table
            lib.log(quoteTable.toString());

            // Log the Location Table
            lib.log(locationTable.toString());
          } else {
            lib.log(response);
          }
        })
        .catch(err => lib.log(err.error));
    });
};

function getQuote(options) {
  return rp({
    method: 'POST',
    url: options.url,
    body: options.quote,
    json: true,
    headers: {
      'content-type': 'application/json',
      authorization: 'AL ' + options.apikey
    }
  });
}
