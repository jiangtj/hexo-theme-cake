/* global hexo */

'use strict';

// If not use this md render, some feature will break.
if (hexo.config.disable_cake_marked) return;

const { highlight } = require('hexo-util');

// external_link
if (hexo.config.external_link === true) {
  hexo.config.external_link = {
    enable: true
  };
}
hexo.config.marked = Object.assign({
  external_link: {
    enable  : hexo.config.external_link.enable,
    exclude : hexo.config.external_link.exclude,
    nofollow: false
  }
}, hexo.config.marked);

// code
hexo.extend.filter.register('marked:renderer', function(renderer) {
  renderer.code = (code, infostring, escaped) => {
    let rendered = highlight(code, {
      lang  : infostring,
      gutter: hexo.config.highlight.line_number,
      tab   : hexo.config.highlight.tab_replace,
      wrap  : hexo.config.highlight.wrap
    });
    return `{% raw %}${rendered}{% endraw %}`;
  };
});
