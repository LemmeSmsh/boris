const chalk = require('chalk');
const inbox = require('./inbox');

const loggerOptions = {
  log: {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'white',
    backgroundColor: '#333',
  },
  success: {
    padding: 1,
    borderStyle: 'double',
    borderColor: 'green',
    backgroundColor: '#333',
  },
  warn: {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'yellow',
    backgroundColor: '#333',
  },
  error: {
    padding: 1,
    borderStyle: 'bold',
    borderColor: 'red',
    backgroundColor: '#333',
  },
};

const logger = new Proxy(console, {
  get(target, prop) {
    const log = (message, titled) => target.log(inbox(message, loggerOptions[prop], titled));

    if (Object.keys(loggerOptions).includes(prop)) {
      return (message) => {
        switch (prop) {
          case 'error':
            target.log(chalk.red.bold(`\nERROR:`));
            log(message, true);
            break;
          default:
            log(message);
            break;
        }
      };
    } else {
      target.log(inbox(`logger is called with ${prop}`, null, loggerOptions['error']));
      return target[prop];
    }
  },
});

module.exports = logger;
