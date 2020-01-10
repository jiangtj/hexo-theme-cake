/* global hexo */

'use strict';

const {Cache} = require('hexo-util');
const cache = new Cache();

hexo.extend.filter.register('injector', function(injector) {
  let mediumZoom = hexo.theme.config.medium_zoom;
  if (!mediumZoom.enable) return;
  injector.register('bodyEnd', () => {
    return cache.apply('cache', () => [
      `<script src="${mediumZoom.cdn}" crossorigin="anonymous"></script>`,
      `<script>mediumZoom('${mediumZoom.selector}');</script>`
    ].join(''));
  });
});
