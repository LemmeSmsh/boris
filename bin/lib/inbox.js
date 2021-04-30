const boxen = require('boxen');
const chalk = require('chalk');
const _beautify = require('json-beautify');

const defaultInboxOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'green',
  backgroundColor: '#555555',
};

const json = (object, space = 2, limit = 100, replacer = null) => _beautify(object, replacer, space, limit);

const formatText = (text) => {
  let _text = chalk.white.bold(text);

  return json(_text);
};

const _inbox = (text = '') => {
  return formatText(text), defaultInboxOptions;
};

module.exports = _inbox;
