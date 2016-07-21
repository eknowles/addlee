'use strict';

var rp = require('request-promise');
var Table = require('cli-table');

const SANDBOX_URL = 'https://sandbox.api.addisonlee.com/api/v2-sandbox/quickbook/quote/price';
const LIVE_URL = 'https://api.addisonlee.com/api/v2/quickbook/quote/price';

module.exports = function (program) {
  return program
    .description('Get a price for a journey')
    .command('price [locations]')
    .option('-t, --tomorrow', 'Set pickup time for tomorrow')
    .option('-p, --promo [promo]', 'Set Promo Code')
    .option('-k, --key <apikey>', 'Set API Key')
    .option('-S, --service <service>', 'Set service type for the quote', 'OneFourPassengers', /^(OneFourPassengers|FiveSixPassengers|Prius|VipE)$/i)
    .option('-c, --cash', 'Set payment method to Cash')
    .option('-C, --credit-card', 'Set payment method to Credit Card')
    .option('-s, --sandbox', 'Use the sandbox env of MuleSoft')
    .action(function (locations, pr) {
      const LOC = locations || 'NW13ER,TW61EW';
      const URL = pr.sandbox ? SANDBOX_URL : LIVE_URL;
      const API_KEY = pr.apikey ? pr.apikey : pr.parent.config.get('apikey');
      let quote = {};
      quote.payment_method = 'Account';
      quote.services = [{ code: pr.service }];

      if (pr.cash) {
        quote.payment_method = 'Cash';
      } else if (pr.creditCard) {
        quote.payment_method = 'CreditCard';
      }

      if (pr.promo) {
        quote.promo_code = pr.promo;
      }

      getLocations(LOC.split(',')).then(function (res) {
        quote.locations = res;
        return getQuote({
          url: URL,
          quote: quote,
          apikey: API_KEY
        });
      }).then(function (response) {
        console.log('Request ID: ', response.request_id);

        let head = Object.keys(response.locations[0]);
        let headers = head.map(function (head) {
          return head.toUpperCase();
        });
        let table = new Table({head: headers});
        response.locations.forEach(function (location) {
          let o = [];
          head.forEach(function (i, ind) {
            o.push(location[i]);
          });
          table.push(o);
        });
        console.log(table.toString());
        console.log(response.quotes[0]);
      }).catch(function (err) {
        console.log('There was an error');
      });
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

function getLocations(postcodes) {
  const POSTCODE_URL = 'http://api.postcodes.io/postcodes';
  return rp({
    method: 'POST',
    url: POSTCODE_URL,
    body: { postcodes: postcodes },
    json: true,
    headers: {
      'content-type': 'application/json'
    }
  }).then(function (response) {
    return response.result.map(function (o) {
      return o.result;
    }).map(function (o) {
      return {
        lat: o.latitude,
        long: o.longitude
      }
    });
  }).catch(function (err) {
    return [];
  });
}
