'use strict';

module.exports = hexo => {
  const { copy } = require('../../utils');
  const { join } = require('path');
  const injector = require('hexo-extend-injector2')(hexo);

  // copy hexo's config
  hexo.extend.filter.register('before_generate', () => {
    copy(hexo.theme.config.comment, hexo.config.comment);
  }, -10);

  // register comment
  hexo.extend.filter.register('before_generate', () => {
    let comments = hexo.theme.config.comment || [];
    let availableList = injector.get('comment').list();
    let availableMap = new Map();
    availableList.forEach(item => availableMap.set(item.name, item));
    comments.forEach(config => {
      let element = availableMap.get(config.name);
      copy(element, config);
      // load body
      injector.register('comment-body', Object.assign({isRun: true, button: element.name}, element));
      // load meta
      if (element.meta && element.meta.enable) {
        injector.register('post-meta', {
          predicate: ctx => ctx.page.comments,
          value    : element.meta.value,
          isRun    : true
        });
        injector.register('body-end', {
          predicate: ctx => ctx.page.comments,
          value    : element.meta.script,
          isRun    : true
        });
      }
    });
  }, 999);

  injector.register('js', join(__dirname, 'dist.js'));

  require('./disqus')(hexo);
};
