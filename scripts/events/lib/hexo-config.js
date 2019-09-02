'use strict';

module.exports = function(hexo) {

  if (hexo.config.relative_link) {
    hexo.config.relative_link = false;
    hexo.log.warn('`relative_link` has been set to false for better generate speed.');
  }

};
