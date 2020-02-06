/* global hexo */

'use strict';

const injector = require('../../hexo/_inject/index')(hexo);

hexo.extend.filter.register('before_generate', () => {
  let config = hexo.theme.config.fontawesome;
  if (config.type === 'cdn') {
    let integrity = config.integrity ? ` integrity="${config.integrity}"` : '';
    injector.register('head', {
      value: `<link rel="stylesheet" href="${config.url}"${integrity} crossorigin="anonymous">`,
      isRun: true
    });
    return;
  }
  if (config.type === 'kit') {
    injector.register('head', {
      value: `<script src="${config.url}" crossorigin="anonymous"></script>`,
      isRun: true
    });
  }
});
