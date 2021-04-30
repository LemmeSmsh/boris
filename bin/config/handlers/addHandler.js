const fs = require('fs');

const logger = require('../../lib/logger');
const json = require('../../lib/json');

const config = require('../config.json'); // object

const addHandler = ({ key, value, flags }) => {
  switch (key) {
    case 'template':
      const { active, inactive, ...rest } = config;

      if ([...inactive, active].includes(value)) {
        logger.error(`**${value}** is already defined!`);
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

module.exports = addHandler;
