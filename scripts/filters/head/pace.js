/* global hexo */

'use strict';

const injector = require('../../hexo/_inject/index')(hexo);

hexo.extend.filter.register('before_generate', () => {
  let pace = hexo.theme.config.pace;
  if (!pace.enable) return;
  injector.register('head', {
    value: `<script src="${pace.cdn}"></script><link rel="stylesheet" href="${pace.theme}"/>`,
    isRun: true
  });
});
