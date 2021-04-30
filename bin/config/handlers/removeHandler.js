const fs = require('fs');

const logger = require('../../lib/logger');
const json = require('../../lib/json');
const ask = require('../../lib/ask');

const config = require('../config.json'); // object

const removeHandler = ({ key, value, flags }) => {
  switch (key) {
    case 'template':
      let { active, inactive, removed, ...rest } = config;

      if (value === 'default') {
        logger.error('You can not remove default template (just keep it inactive)');
        break;
      }
      if (active === value) {
        const answer = ask(`**<${value};blue>** template is active right now. Do you want to remove it? (y/n)`);

        if (String(answer).toLowerCase() === 'y') {
          inactive.push(active);
          active = inactive[0];
        } else {
          break;
        }
      }
      if (![...inactive, ...removed].includes(value)) {
        logger.error(`**${value}** template not found`);
        break;
      }
      if (removed.includes(value)) {
        logger.error(
          `**${value}** template is already removed (run "boris remove template ${value} -f" to delete it permanently)`
        );
        break;
      }

      const nextConfig = {
        ...rest,
        active,
        inactive: [...inactive, active].filter((template) => template !== value),
        removed: [...removed, value],
      };

      fs.writeFile('./bin/config/config.json', json(nextConfig), (err) => {
        err ? logger.error(err) : logger.success(`Current active template is **<${value};blue>**`);
      });

      break;
    default:
      break;
  }
};

module.exports = removeHandler;
