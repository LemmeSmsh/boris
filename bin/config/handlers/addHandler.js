const fs = require('fs');

const logger = require('../../lib/logger');
const json = require('../../lib/json');

const config = require('../config.json'); // object

const addHandler = ({ key, value, flags }) => {
  switch (key) {
    case 'template':
      const { active, storage, removed, ...rest } = config;

      if (storage.includes(value)) {
        logger.error(`Template **${value}** is already defined!`);
        break;
      }
      if (removed.includes(value)) {
        logger.warn(
          `Template with **${value}** name is currently removed (run "boris config restore template ${value}" to restore it or "boris config remove template ${value} -f" to remove it permanently)`
        );
        break;
      }

      const nextConfig = {
        ...config,
        storage: [...storage, value],
      };

      fs.writeFile('./bin/config/config.json', json(nextConfig), (err) => {
        err
          ? logger.error(err)
          : logger.success(`Template **${value}** is successfully added, current status: <inactive;yellow>`);
      });

      break;
    default:
      break;
  }
};

module.exports = addHandler;
