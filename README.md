<h1 align="center">Addison Lee Developer CLI</h1>

<p align="center">
A command line interface to get quotes, cancel bookings, get available services etc.
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

## Usage

To install addlee from npm, run:

```bash
$ npm install -g addlee
```

Persist your MuleSoft Application API key to the config

```bash
$ addlee config apikey bf04c59b953aaad945bb10ee0eac532d:9b3344bb2ec9fb643eecac8389d2521b
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
```

Outputs

```bash
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
