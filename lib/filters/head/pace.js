'use strict';

module.exports = hexo => {

  const injector = require('hexo-extend-injector2')(hexo);

  hexo.extend.filter.register('before_generate', () => {
    let pace = hexo.theme.config.pace;
    if (!pace.enable) return;
    injector.register('head', {
      value: `<script src="${pace.cdn}"></script><link rel="stylesheet" href="${pace.theme}"/>`,
      isRun: true
    });
  });
};
