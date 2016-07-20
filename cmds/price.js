'use strict';

module.exports = function (program) {
  program
    .command('price [locations]')
    .version('0.0.0')
    .description('Get a price for a journey')
    .action(function (locations) {
      locations = locations || 'NW13ER,TW61EW';
    });
};
