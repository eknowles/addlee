# Addison Lee Developer CLI

## Description

A CLI for developers to play with public API's to get quotes, cancel bookings, get available services etc.

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

```
$ npm install -g addlee
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
$ addlee price NW13ER,W60TB
```

To test different pricing by accounts you can change API key using the `--key <key>` argument.

```bash
$ addlee price NW13ER,W60TB --key 91hux89ux91oijsq98s1:89djdqj1kjljlkkldoi990
```

## License

Copyright (c) 2016 Edward Knowles

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Acknowledgments
