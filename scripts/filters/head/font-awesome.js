/* global hexo */

'use strict';

hexo.extend.filter.register('injector', function(injector) {
  let config = hexo.theme.config.fontawesome;
  if (config.type === 'cdn') {
    let integrity = config.integrity ? ` integrity="${config.integrity}"` : '';
    injector.register('head', `<link rel="stylesheet" href="${config.url}"${integrity} crossorigin="anonymous">`);
    return;
  }
  if (config.type === 'kit') {
    injector.register('head', `<script src="${config.url}" crossorigin="anonymous"></script>`);
  }
});
