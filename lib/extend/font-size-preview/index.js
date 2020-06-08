'use strict';

module.exports = hexo => {

  if (!hexo.config.font_size_ol_edit_preview) return;

  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');

  injector.register('sidebar', '<div class="font-size-ol"><a class="font-size-ol-sub">A-</a><span class="font-size-ol-value">14</span><a class="font-size-ol-plus">A+</a></div>', () => true, 20);
  injector.register('js', join(__dirname, 'dist.js'));
  injector.register('style', join(__dirname, 'style.styl'));
};
