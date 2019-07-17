/* global hexo */

'use strict';

const priority = hexo.config.inject_priority_creative_commons || 30;

console.log("creative-commons:" + priority);

hexo.extend.filter.register('theme_inject', function(injects) {
  injects.postBodyEnd.raw('creative-commons', `
  {% if theme.creative_commons.license and theme.creative_commons.post and not is_index %}
    <div>
      {{ partial( '_partials/post/post-copyright.swig', { post: post }) }}
    </div>
  {% endif %}
  `, {}, {cache: true});
}, priority);
