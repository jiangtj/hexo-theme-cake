/* global hexo */

'use strict';

const path = require('path');

hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  if (theme.creative_commons.license && theme.creative_commons.post) {
    injects.postBodyEnd.file('creative-commons', path.join(hexo.theme_dir, 'layout/_partials/post/post-copyright.swig'), {}, {}, theme.creative_commons.inject_order);
  }
}, 200);
