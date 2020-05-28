'use strict';

module.exports = hexo => {

  let config = hexo.config.lozad = Object.assign({
    enable: true,
    faster: true,
    load  : 'bundler'
  }, hexo.config.lozad);

  if (!config.enable) return;

  require('./renderer')(hexo, config);
  require('./load')(hexo, config);

};
