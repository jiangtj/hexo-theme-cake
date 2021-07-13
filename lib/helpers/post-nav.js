'use strict';

const { faInline } = require('../fontawesome/fa');

module.exports = options => function(post) {
  if (options === false || (!post.prev && !post.next)) return '';
  const prev = options === 'right' ? post.prev : post.next;
  const next = options === 'right' ? post.next : post.prev;
  const left = prev ? `
    <a href="${this.url_for(prev.path)}" rel="prev" title="${prev.title}">
      ${faInline('chevron-left', {prefix: 'fas'})}
      ${prev.title.length > 20 ? prev.title.substring(0, 18) + '...' : prev.title}
    </a>` : '';
  const right = next ? `
    <a href="${this.url_for(next.path)}" rel="next" title="${next.title}">
      ${next.title.length > 20 ? next.title.substring(0, 18) + '...' : next.title}
      ${faInline('chevron-right', {prefix: 'fas'})}
    </a>` : '';
  return `
    <div class="post-nav">
      <div class="post-nav-item">${left}</div>
      <div class="post-nav-item">${right}</div>
    </div>`;
};
