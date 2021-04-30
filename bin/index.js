#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

switch (argv._[0]) {
  case 'config':
    require('./config');
    break;
  default:
    break;
}
