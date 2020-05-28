'use strict';

const { join } = require('path');

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  injector.register('style', join(hexo.plugin_dir, '@fortawesome/fontawesome-svg-core/styles.css'));
};
