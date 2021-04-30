const fs = require('fs');

const logger = require('../../lib/logger');
const json = require('../../lib/json');
const ask = require('../../lib/ask');

const config = require('../config.json'); // object

const removeHandler = async ({ key, value, flags }) => {
  switch (key) {
    case 'template':
      let { active, storage, removed, ...rest } = config;

      if (value === 'default') {
        logger.error('You can not remove **default** template (just keep it inactive)');
        break;
      }
      if (active === value) {
        const answer = await ask(`Template **<${value};blue>** is active right now. Do you want to remove it? (y/n)`);

        if (String(answer).toLowerCase() === 'y') {
          active = 'default';
        } else {
          break;
        }
      }
      if (![...storage, ...removed].includes(value)) {
        logger.error(`Template **${value}** not found`);
        break;
      }
      if (removed.includes(value) && !flags.f) {
        logger.error(
          `Template **${value}** is already removed (run **boris remove template ${value} -f** to delete it permanently)`
        );
        break;
      }

      if (flags.f) {
        const answer = await ask(`Do you want to delete <${value};blue> permanently? (y/n)`);

        if (String(answer).toLowerCase() === 'y') {
          removed = removed.filter((template) => template !== value);
          storage = storage.filter((template) => template !== value);

          fs.writeFile('./bin/config/config.json', json({ ...config, storage, removed, active }), (err) => {
            err ? logger.error(err) : logger.success(`Template **<${value};red>** is deleted`);
          });
        }

        break;
      } else {
        const nextConfig = {
          ...config,
          active,
          storage: storage.filter((template) => template !== value),
          removed: [...removed, value],
        };

        fs.writeFile('./bin/config/config.json', json(nextConfig), (err) => {
          err ? logger.error(err) : logger.success(`Template **<${value};red>** is successfully removed`);
        });

        break;
      }

    default:
      break;
  }
};

module.exports = removeHandler;
