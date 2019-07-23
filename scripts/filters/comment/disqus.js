/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  if (!theme.disqus.enable || !theme.disqus.shortname) return;
  
  injects.comment.raw('disqus', `
  <div class="comments" id="comments">
    <div id="disqus_thread">
      <noscript>{#
      #}Please enable JavaScript to view the comments powered by Disqus.{#
    #}</noscript>
    </div>
  </div>
  `);

  injects.bodyEnd.file('disqus', path.join(hexo.theme_dir, 'layout/_third-party/comments/disqus.swig'));

}, hexo.config.inject_priority_disqus);

// Add post_meta
hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  if (!theme.disqus.enable || !theme.disqus.shortname) return;
  
  injects.postMeta.raw('disqus', `
  <span class="post-meta-item">
    <span class="post-meta-item-icon">
      <i class="fa fa-comment-o"></i>
    </span>
    <span class="post-meta-item-text">{{ __('post.comments_count') + __('symbol.colon') }}</span>
    <a href="{{ url_for(post.path) }}#comments" itemprop="discussionUrl">
      <span class="post-comments-count disqus-comment-count" data-disqus-identifier="{{ post.path }}" itemprop="commentCount"></span>
    </a>
  </span>
  `);

}, hexo.config.inject_priority_disqus_post_meta);
