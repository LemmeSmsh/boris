const _beautify = require('json-beautify');

const json = (object, space = 2, limit = 100, replacer = null) => _beautify(object, replacer, space, limit);

module.exports = json;
