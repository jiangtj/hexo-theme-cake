/* global hexo */

'use strict';

hexo.on('generateBefore', function () {
  // Merge config.
  require('./config')(hexo);
  // Add filter type `theme_inject`.
  require('./injects')(hexo);
});
