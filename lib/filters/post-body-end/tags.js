'use strict';

module.exports = hexo => {

  const injector = require('hexo-extend-injector2')(hexo);

  injector.register('postBodyEnd', ctx => {
    let tagContent = ctx.page.tags.map(tag => {
      return `<a href="${ctx.url_for(tag.path)}" rel="tag"># ${tag.name}</a>`;
    }).join('');
    return `<div class="post-tags">${tagContent}</div>`;
  }, ctx => ctx.is_post() && ctx.page.tags && ctx.page.tags.length);
};
