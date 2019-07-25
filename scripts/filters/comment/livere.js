/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  if (!theme.livere_uid) return;

  injects.comment.raw('livere', `
  <div class="comments" id="comments">
    <div id="lv-container" data-id="city" data-uid="{{ theme.livere_uid }}"></div>
  </div>
  `, {}, {cache: true});

  injects.bodyEnd.file('livere', path.join(hexo.theme_dir, 'layout/_third-party/comments/livere.swig'));

}, hexo.config.inject_priority_livere);
