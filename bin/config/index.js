#!/usr/bin/env node

/*
  Config Example
*/

const json = require('../lib/json');
const logger = require('../lib/logger');
const handlers = require('./handlers/index');
const { active, inactive } = require('./config.json'); // object

const path = require('path');
const fs = require('fs');

const folderUsage = process.cwd();
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const { _, ...flags } = argv;

if (_[0] !== 'config') _.unshift('config');

const commandKey = _[1];

/* For actions (set, add, remove, etc.)
 */
const commandData = {
  key: _[2],
  value: _[3],
};

console.log(argv);

const displayList = () => {
  const fullList = [
    `Active: **<${active};blue>**`,
    '**============================**',
    '<Templates list;yellow>:',
    inactive.reduce((acc, current, index) => (acc += `**${++index}.** ${current}\n`), ''),
  ].join('\n\n');

  logger.log(fullList);
};

const displayActive = () => {
  logger.success(`Current template is **<${active};blue>**`);
};

switch (commandKey) {
  case 'list':
    displayList();
    break;
  case 'active':
    displayActive();
    break;
  case 'set':
    handlers.set(commandData);
    break;
  case 'add':
    handlers.add(commandData);
    break;
  case 'export':
    break;
}
