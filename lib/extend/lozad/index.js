'use strict';

module.exports = hexo => {

  const config = Object.assign({
    enable: true,
    faster: true,
    load: 'bundler'
  }, hexo.config.lozad);

  hexo.config.lozad = config;

  if (!config.enable) return;

  require('./renderer')(hexo, config);
  require('./load')(hexo, config);

};
