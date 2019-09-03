/* global hexo */

'use strict';

hexo.extend.helper.register('cake_image', function(url, options, extra) {
  let theme = hexo.theme.config;
  url = this.url_for(url);
  let src = `src="${url}"`;

  let innerOptions = Object.assign({
    zoomable: theme.medium_zoom.enable,
    lozad   : theme.lozad.enable
  }, options);

  let zoomable = '';
  if (innerOptions.zoomable) {
    zoomable = 'data-zoomable="true"';
  }

  if (innerOptions.lozad) {
    src = `data-src="${url}"`;
  }

  return `<img ${src} ${zoomable} ${extra}/>`;
});
