#!/usr/bin/env node

/*
  Config Example
*/

const json = require('../lib/json');
const logger = require('../lib/logger');
const handlers = require('./handlers/index');
const { active, storage, removed } = require('./config.json'); // object

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
  flags,
};

const displayList = (flags) => {
  const fullList = [
    '<Templates list;yellow>:',
    storage.reduce((acc, current, index) => (acc += `**${++index}.** ${current}\n`), ''),
  ];

  fullList[1] = fullList[1].replace(active, `**<${active};blue>**`);

  if (flags.a) {
    fullList.push('**============================**');
    fullList.push('<Removed templates;red>:');
    fullList.push(removed.reduce((acc, current, index) => (acc += `**${++index}.** ${current}\n`), ''));
  }

  logger.log(fullList.join('\n\n'));
};

const displayActive = (flags) => {
  logger.success(`Current template is **<${active};blue>**`);
};

switch (commandKey) {
  case 'list':
    displayList(flags);
    break;
  case 'active':
    displayActive(flags);
    break;
  case 'set':
    handlers.set(commandData);
    break;
  case 'add':
    handlers.add(commandData);
    break;
  case 'remove':
    handlers.remove(commandData);
    break;
  case 'restore':
    handlers.restore(commandData);
    break;
  case 'export':
    break;
}
