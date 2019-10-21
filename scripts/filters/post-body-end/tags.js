/* global hexo */

'use strict';

hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  injects.postBodyEnd.raw('tags.ejs', `
    <% if (is_post() && page.tags && page.tags.length) { %>
      <div class="post-tags">
        <% page.tags.forEach(tag => { %>
          <a href="<%= url_for(tag.path) %>" rel="tag"># <%= tag.name %></a>
        <% }); %>
      </div>
    <% } %>
  `, {}, {}, theme.tags_inject_order);
}, 300);
