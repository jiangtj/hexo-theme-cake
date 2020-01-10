/* global hexo */

'use strict';

hexo.extend.filter.register('injector', function(injector) {
  let pace = hexo.theme.config.pace;
  if (!pace.enable) return;
  injector.register('head', `<script src="${pace.cdn}"></script><link rel="stylesheet" href="${pace.theme}"/>`);
});
