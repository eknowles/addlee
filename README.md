<h1 align="center">Addison Lee Developer CLI</h1>

<p align="center">
A command line interface to get quotes, cancel bookings, get available services etc.
</p>

<p align="center">
  <a href="https://npmjs.org/package/addlee">
    <img src="https://img.shields.io/npm/v/addlee.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/eknowles/addlee">
    <img src="https://img.shields.io/coveralls/eknowles/addlee/master.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/eknowles/addlee">
    <img src="https://img.shields.io/travis/eknowles/addlee/master.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/addlee">
    <img src="http://img.shields.io/npm/dm/addlee.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/eknowles/addlee.svg">
    <img src="https://david-dm.org/eknowles/addlee.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/eknowles/addlee/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/addlee.svg?style=flat-square"
         alt="License">
  </a>
</p>

```bash
addlee --help

  Usage: addlee [options] [command]

  Commands:

    price [options] [locations]
    completion             Print command completion script
    config [key] [value]   Get and set options

  Options:

    -h, --help     output usage information
    -d, --debug    enable debugger
    -V, --version  output the version number
```

# Install

```bash
$ npm install -g addlee
```

# Features

- Test Sandbox and Live
- Get a quote for a car
- Get a list of fixed zonal prices available
- List available services for your account
- List available payment methods for an account
- Get details for a booking
- Cancel a booking

## Setup

Persist your MuleSoft Application API key to the config

```bash
$ addlee config apikey bf04c59b953aaad945bb10ee0eac532d:9b3344bb2ec9fb643eecac8389d2521b
```

Set the default price lookup locations for commands like `price`

```bash
$ addlee config defaultLocations NW13ER,W1A1AA
```

## Commands

### Price

Using the Quickbook v2 API this command returns a quote and price

```bash
$ addlee price --help

  Usage: price [options] [locations]

  Options:

    -h, --help               output usage information
    -t, --tomorrow           Set pickup time for tomorrow
    -p, --promo [promo]      Set Promo Code
    -k, --key <apikey>       Set API Key
    -S, --service <service>  Set service type for the quote
    -c, --cash               Set payment method to Cash
    -C, --credit-card        Set payment method to Credit Card
    -s, --sandbox            Use the sandbox env of MuleSoft
```

Here's an example using NW1 to W6

```bash
$ addlee price NW13ER,TW61RR
{ request_id: '0e39dde7-1074-47fe-b86e-70997eb19d81',
  locations:
   [ { address: '7-9 WILLIAM RD, KINGS CROSS, LONDON NW1 3ER, UK',
       lat: 51.52701649999999,
       long: -0.1393921,
       source: 'GOOGLE' },
     { address: 'TERMINAL 2, INNER RING E, LONGFORD, HOUNSLOW TW6 1RR, UK',
       lat: 51.46957580000001,
       long: -0.4496072,
       source: 'GOOGLE' } ],
  quotes:
   [ { service: 'OneFourPassengers',
       quote_id: '9f27a167-f6c9-4f81-940e-f040ce2e3c4b',
       total_price: 77.34,
       price: 77.34,
       discount: 0,
       vat: 12.89,
       currency: 'GBP',
       eta: 20,
       payment_token: 'N/A',
       payment_url: 'N/A' } ] }
```

Or with tables

```bash
$ addlee price NW13ER,TW61RR -T
┌─────────────┬──────────────────────────────────────┐
│ Request ID  │ 5dd019dd-8be7-4704-bbc0-4f3c99ca6d16 │
├─────────────┼──────────────────────────────────────┤
│ Quote ID    │ 4d702b47-107b-47ca-b767-311efc62f5c5 │
├─────────────┼──────────────────────────────────────┤
│ ETA         │ 15 mins                              │
├─────────────┼──────────────────────────────────────┤
│ Discount    │ 0 GBP                                │
├─────────────┼──────────────────────────────────────┤
│ VAT         │ 12.89 GBP                            │
├─────────────┼──────────────────────────────────────┤
│ Total Price │ 77.34 GBP                            │
└─────────────┴──────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┬───────────────────┬────────────┬────────┐
│ ADDRESS                                                  │ LAT               │ LONG       │ SOURCE │
├──────────────────────────────────────────────────────────┼───────────────────┼────────────┼────────┤
│ 7-9 WILLIAM RD, KINGS CROSS, LONDON NW1 3ER, UK          │ 51.52701649999999 │ -0.1393921 │ GOOGLE │
├──────────────────────────────────────────────────────────┼───────────────────┼────────────┼────────┤
│ TERMINAL 2, INNER RING E, LONGFORD, HOUNSLOW TW6 1RR, UK │ 51.46957580000001 │ -0.4496072 │ GOOGLE │
└──────────────────────────────────────────────────────────┴───────────────────┴────────────┴────────┘
```

To test different pricing by accounts you can change API key using the `--key <key>` argument.

```bash
$ addlee price NW13ER,W60TB --key 91hux89ux91oijsq98s1:89djdqj1kjljlkkldoi990
```

## License

Copyright (c) 2016 Edward Knowles

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Acknowledgments
