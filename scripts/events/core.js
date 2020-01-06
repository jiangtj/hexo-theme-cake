/* global hexo */

'use strict';

hexo.on('generateBefore', () => {
  // Modify hexo config.
  require('./lib/hexo-config')(hexo);
  // Add filter type `theme_inject`.
  require('./lib/injects')(hexo);
});
