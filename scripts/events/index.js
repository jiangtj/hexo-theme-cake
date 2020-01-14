/* global hexo */

'use strict';

hexo.on('generateBefore', () => {
  // Add filter type `theme_inject`
  require('./lib/injects')(hexo);
});
