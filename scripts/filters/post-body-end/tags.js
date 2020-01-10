/* global hexo */

'use strict';

hexo.extend.filter.register('injector', function(injector) {
  injector.register('postBodyEnd', ctx => {
    let tagContent = ctx.page.tags.map(tag => {
      return `<a href="${ctx.url_for(tag.path)}" rel="tag"># ${tag.name}</a>`;
    }).join('');
    return `<div class="post-tags">${tagContent}</div>`;
  }, ctx => ctx.is_post() && ctx.page.tags && ctx.page.tags.length);
}, 300);
