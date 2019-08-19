/* global hexo */

'use strict';

hexo.extend.helper.register('cake_image', function(url) {
  let theme = hexo.theme.config;
  url = this.url_for(url);
  let src = `src="${url}"`;
  let zoomable = '';
  if (theme.medium_zoom.enable) {
    src = `data-src="${url}"`;
    zoomable = 'data-zoomable="true"';
  }
  return `<img ${src} ${zoomable} itemprop="image"/>`;
});
