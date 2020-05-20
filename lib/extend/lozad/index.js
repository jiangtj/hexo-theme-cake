'use strict';

module.exports = hexo => {

  let config = hexo.config.lozad = Object.assign({
    enable: true,
    load  : 'bundler'
  }, hexo.config.lozad);

  if (!config.enable) return;

  require('./renderer')(hexo);
  require('./load')(hexo, config);

};
