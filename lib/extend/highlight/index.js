'use strict';

module.exports = hexo => {

  const { loadUtil } = require('../../utils');
  const load = loadUtil(hexo);
  if (!hexo.config.disable_marked_highlight) {
    hexo.config.highlight.enable = false;
    return load('hexo-filter-marked-highlight');
  }
};
