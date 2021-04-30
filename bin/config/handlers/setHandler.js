const fs = require('fs');

const logger = require('../../lib/logger');
const json = require('../../lib/json');

const config = require('../config.json'); // object

const setHandler = ({ key, value, flags }) => {
  switch (key) {
    case 'active':
      const { active, storage, ...rest } = config;

      if (active === value) {
        logger.warn(`Template **<${value};blue>** is already active`);
        break;
      }
      if (!storage.includes(value)) {
        logger.error(`Templates storage doesn\'t include "**${value}**"`);
        break;
      }

      const nextConfig = {
        ...config,
        active: value,
      };

      fs.writeFile('./bin/config/config.json', json(nextConfig), (err) => {
        err ? logger.error(err) : logger.success(`Current active template is **<${value};blue>**`);
      });

      break;
    default:
      break;
  }
};

module.exports = setHandler;
