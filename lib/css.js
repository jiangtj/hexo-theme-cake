'use strict';

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');
  injector.register('variable', { path: join(hexo.theme_dir, 'source/css/_variables/index.styl') });
  injector.register('variable', { path: join(hexo.theme_dir, 'source/css/color/index.styl'), priority: 100 });
  injector.register('style', { path: join(hexo.theme_dir, 'source/css/_styles/index.styl') });
};
