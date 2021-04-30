#!/usr/bin/env node

/*
  Config Example
*/

const path = require('path');
const fs = require('fs');
const folderUsage = process.env.PWD;
const argv = require('yargs/yargs')(process.argv.slice(2)).argv._;

const logger = require('../lib/logger');
const config = require('./index.json');

const command = argv[1];
const commandValue = argv[2];

switch (command) {
  case 'list':
    logger.log(config);
    break;
  case 'set':
    logger.log(`try set ${argv[2]} as ${argv[3]}`);
    break;
  case 'export':
    fs.writeFileSync(path.resolve(folderUsage, 'borisConfig.json'), config);
    logger.success(`Config is exported in ${folderUsage}`);
    break;
}
