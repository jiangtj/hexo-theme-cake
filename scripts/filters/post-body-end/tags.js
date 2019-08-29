/* global hexo */

'use strict';

hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  injects.postBodyEnd.raw('tags', `
    {%- if is_post() and page.tags and page.tags.length %}
      <div class="post-tags">
        {%- for tag in page.tags %}
          <a href="{{ url_for(tag.path) }}" rel="tag"># {{ tag.name }}</a>
        {%- endfor %}
      </div>
    {%- endif %}
  `, {}, {}, theme.tags_inject_order);
}, 300);
