'use strict';

module.exports = hexo => {
  const { copy } = require('../../utils');
  const { join } = require('path');
  const injector = require('hexo-extend-injector2')(hexo);

  require('./disqus')(hexo);
  require('./utteranc')(hexo);
  require('./livere')(hexo);

  // copy hexo's config
  hexo.extend.filter.register('before_generate', () => {
    copy(hexo.theme.config.comment, hexo.config.comment);
  }, -10);

  // register comment
  hexo.extend.filter.register('before_generate', () => {
    const comments = hexo.theme.config.comment || [];
    const availableList = injector.get('comment').list();
    const availableMap = new Map();
    availableList.forEach(item => availableMap.set(item.name, item));
    comments.forEach(config => {
      const element = availableMap.get(config.name);
      if (!element) {
        hexo.log.warn(`The comment system: ${config.name} not exist!`);
        return;
      }
      copy(element, config);
      // load body
      injector.register('comment-body', Object.assign({button: element.name}, element, {isRun: true}));
      // load meta
      if (element.meta && element.meta.enable) {
        injector.register('post-meta', {
          predicate: ctx => ctx.is_home() || ctx.page.comments,
          value: element.meta.value,
          isRun: true
        });
        injector.register('body-end', {
          predicate: ctx => ctx.is_home() || ctx.page.comments,
          value: element.meta.script,
          isRun: true
        });
      }
      // load style
      if (element.style) {
        injector.register('style', element.style);
      }
    });
  }, 999);

  injector.register('js', join(__dirname, 'dist.js'));
};
