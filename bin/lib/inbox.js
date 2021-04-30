const boxen = require('boxen');
const chalk = require('chalk');
const json = require('./json');

const defaultInboxOptions = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
  borderColor: 'green',
  backgroundColor: '#555555',
};

const matcherBold = /\*{2}\S+\*{2}/g;
const matcherColor = /<.+;[#\d\w]+>/g;

const transformText = (text) => {
  const bolded = text.match(matcherBold) || [];

  bolded.forEach((match) => {
    const replacer = chalk.bold(match.replace(/\*{2}/g, ''));

    text = text.replace(match, replacer);
  });

  const colored = text.match(matcherColor) || [];

  colored.forEach((match) => {
    const [clearString, color] = match.replace(/[<>]/g, '').split(';');

    text = text.replace(match, chalk[color](clearString));
  });

  return text;
};

const formatText = (text) => {
  let _text;
  switch (typeof text) {
    case 'object':
      _text = json(text);
      break;
    case 'string':
      _text = transformText(chalk.white(text));
      break;
    default:
      break;
  }

  return _text;
};

const _inbox = (text = '', options = {}, titled = false) => {
  const _options = { ...defaultInboxOptions, ...options, ...{ margin: titled ? 0 : 1 } };

  return boxen(formatText(text), _options);
};

module.exports = _inbox;
