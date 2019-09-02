/* global hexo */

'use strict';

hexo.on('generateBefore', () => {
  // Merge config.
  require('./lib/config')(hexo);
  // Modify hexo config.
  require('./lib/hexo-config')(hexo);
  // Add filter type `theme_inject`.
  require('./lib/injects')(hexo);
  // Fix categories and tags.
  require('./lib/fix-categories-tags')(hexo);
});
