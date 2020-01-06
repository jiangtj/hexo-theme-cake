/* global hexo */

'use strict';

hexo.extend.filter.register('theme_inject', function(injects) {
  let config = hexo.theme.config.fontawesome;
  if (config.type === 'cdn') {
    let integrity = config.integrity ? ` integrity="${config.integrity}"` : '';
    injects.head.raw('font-awesome', `<link rel="stylesheet" href="${config.url}"${integrity} crossorigin="anonymous">`, {}, {only: true, cache: true});
    return;
  }
  if (config.type === 'kit') {
    injects.head.raw('font-awesome', `<script src="${config.url}" crossorigin="anonymous"></script>`, {}, {only: true, cache: true});
  }
});
