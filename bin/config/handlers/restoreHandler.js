const fs = require('fs');

const logger = require('../../lib/logger');
const json = require('../../lib/json');

const config = require('../config.json'); // object

const restoreHandler = ({ key, value, flags }) => {
  switch (key) {
    case 'template':
      const { active, storage, removed, ...rest } = config;

      if (storage.includes(value)) {
        logger.error(`Template **${value}** is not removed`);
        break;
      }
      if (!removed.includes(value)) {
        logger.error(`Template **<${value};red>** doesn\'t exist`);
        break;
      }

      const nextConfig = {
        ...config,
        storage: [...storage, value],
        removed: removed.filter((template) => template !== value),
      };

      fs.writeFile('./bin/config/config.json', json(nextConfig), (err) => {
        err ? logger.error(err) : logger.success(`Template **<${value};yellow>** is successfully restored!`);
      });

      break;
    default:
      break;
  }
};

module.exports = restoreHandler;
