/* global hexo */

'use strict';

const path = require('path');
const {iconText} = require('./common');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  let theme = hexo.theme.config;
  if (!theme.disqus.enable || !theme.disqus.shortname) return;

  injects.comment.raw('disqus.ejs', `
  <div class="comments" id="comments">
    <div id="disqus_thread">
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </div>
  </div>
  `, {}, {cache: true});

  injects.bodyEnd.file('disqus', path.join(hexo.theme_dir, 'layout/_third-party/comments/disqus.ejs'));

});

// Add post_meta
hexo.extend.filter.register('theme_inject', injects => {
  let theme = hexo.theme.config;
  if (!theme.disqus.enable || !theme.disqus.shortname || !theme.disqus.count) return;

  injects.postMeta.raw('disqus.ejs', `
  <% if (post.comments) { %>
  <span class="post-meta-item">
    ${iconText('far fa-comment-alt', 'disqus')}
    <a title="disqus" href="<%= url_for(post.path) %>#comments" itemprop="discussionUrl">
      <span class="post-comments-count disqus-comment-count" data-disqus-identifier="<%= post.path %>" itemprop="commentCount"></span>
    </a>
  </span>
  <% } %>
  `, {}, {}, theme.disqus.post_meta_order);

});
