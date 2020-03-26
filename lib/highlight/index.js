'use strict';

const { copy } = require('../utils');

module.exports = hexo => {
  let config = copy({
    engine : 'highlight',
    options: {}
  }, hexo.config.marked_highlight);
  require(`./${config.engine}`)(hexo, config.options);
};
