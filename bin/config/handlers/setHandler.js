const fs = require('fs');

const logger = require('../../lib/logger');
const json = require('../../lib/json');

const config = require('../config.json'); // object

const setHandler = ({ key, value, flags }) => {
  switch (key) {
    case 'active':
      const { active, inactive, ...rest } = config;

      if (active === value) {
        logger.warn(`**<${value};blue>** template is already active`);
        break;
      }
      if (!inactive.includes(value)) {
        logger.error(`Inactive templates doesn\'t include "**${value}**"`);
        break;
      }

      const nextConfig = {
        ...rest,
        active: value,
        inactive: [...inactive, active].filter((template) => template !== value),
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
