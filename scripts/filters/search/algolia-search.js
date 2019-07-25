/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  if (!theme.algolia_search.enable) return;

  injects.menu.raw('algolia-search', `
  <li class="menu-item menu-item-search">
    <a href="javascript:;" class="popup-trigger">
      {% if theme.menu_settings.icons %}
        <i class="menu-item-icon fa fa-search fa-fw"></i> <br/>
      {% endif %}
      {{ __('menu.search') }}
    </a>
  </li>
  `, {}, {cache: true});

  injects.bodyEnd.file('algolia-search', path.join(hexo.theme_dir, 'layout/_third-party/search/algolia-search.swig'));

});