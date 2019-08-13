/* global hexo */

'use strict';

const priority = hexo.config.inject_priority_tags || 300;

hexo.extend.filter.register('theme_inject', function(injects) {
  injects.postBodyEnd.raw('tags', `
    {%- if is_post() and page.tags and page.tags.length %}
      <div class="post-tags">
        {%- for tag in page.tags %}
          <a href="{{ url_for(tag.path) }}" rel="tag"># {{ tag.name }}</a>
        {%- endfor %}
      </div>
    {%- endif %}
  `);
}, priority);
