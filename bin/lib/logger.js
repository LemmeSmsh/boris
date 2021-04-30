const chalk = require('chalk');
const inbox = require('./inbox');

const loggerOptions = {
  log: {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'white',
    backgroundColor: '#333',
  },
  success: {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    backgroundColor: '#333',
  },
  warn: {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'yellow',
    backgroundColor: '#333',
  },
  error: {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'red',
    backgroundColor: '#333',
  },
};

const logger = new Proxy(console, {
  get(target, prop) {
    if (Object.keys(loggerOptions).includes(prop)) {
      return (message) => {
        target.log(inbox(message, null, loggerOptions[prop]));
      };
    } else {
      target.log(inbox(`logger is called with ${prop}`, null, loggerOptions['error']));
      return target[prop];
    }
  },
});

module.exports = logger;
