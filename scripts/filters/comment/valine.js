/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  if (!theme.valine.enable) return;
  
  injects.comment.raw('valine', `
  <div class="comments" id="comments">
    <div id="disqus_thread">
      <noscript>{#
      #}Please enable JavaScript to view the comments powered by Disqus.{#
    #}</noscript>
    </div>
  </div>
  `);

  injects.bodyEnd.file('valine', path.join(hexo.theme_dir, 'layout/_third-party/comments/disqus.swig'));

}, hexo.config.inject_priority_valine);

// Add post_meta
hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  if (!theme.valine.enable) return;
  
  injects.postMeta.raw('valine', `
  {% if post.comments %}
  {% endif %}
  `, {
    disableDefaultLayout: true
  });

}, hexo.config.inject_priority_valine_post_meta);
