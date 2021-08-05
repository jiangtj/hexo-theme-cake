'use strict';

const { icon } = require('@jiangtj/hexo-icon-svg-core/lib/core');

module.exports = hexo => {

  hexo.extend.helper.register('post_nav', function(post) {
    const theme = hexo.theme.config;
    if (theme.post.navigation === false || (!post.prev && !post.next)) return '';
    const prev = theme.post.navigation === 'right' ? post.prev : post.next;
    const next = theme.post.navigation === 'right' ? post.next : post.prev;
    const left = prev ? `
    <a href="${this.url_for(prev.path)}" rel="prev" title="${prev.title}">
      ${icon('chevron-left', {type: 'fa'})}
      ${prev.title.length > 20 ? prev.title.substring(0, 18) + '...' : prev.title}
    </a>` : '';
    const right = next ? `
    <a href="${this.url_for(next.path)}" rel="next" title="${next.title}">
      ${next.title.length > 20 ? next.title.substring(0, 18) + '...' : next.title}
      ${icon('chevron-right', {type: 'fa'})}
    </a>` : '';
    return `
    <div class="post-nav">
      <div class="post-nav-item">${left}</div>
      <div class="post-nav-item">${right}</div>
    </div>`;
  });
};
