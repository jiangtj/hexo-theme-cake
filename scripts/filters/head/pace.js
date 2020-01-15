/* global hexo */

'use strict';

hexo.extend.filter.register('before_generate', () => {
  const injector = hexo.extend.injector2;
  let pace = hexo.theme.config.pace;
  if (!pace.enable) return;
  injector.register('head', {
    value: `<script src="${pace.cdn}"></script><link rel="stylesheet" href="${pace.theme}"/>`,
    isRun: true
  });
});
