/* global hexo */

'use strict';

const {encodeURL} = require('hexo-util');

hexo.extend.filter.register('marked:renderer', function(renderer) {
  if (!hexo.theme.config.lozad.enable) return;
  renderer.image = function(href, title, text) {
    let titleAttr = title ? ` title="${title}"` : '';
    let textAttr = text ? ` alt="${text}"` : '';
    return `<img data-src="${encodeURL(href)}"${titleAttr}${textAttr}>`;
  };
}, 99);

hexo.extend.filter.register('theme_inject', function(injects) {
  let lozad = hexo.theme.config.lozad;

  if (!lozad.enable) return;

  injects.bodyEnd.raw('lozad', `
  <script src="${lozad.cdn}" crossorigin="anonymous"></script>
  <script>
    lozad('[data-src]').observe();
  </script>
  `, {}, {cache: true});
});
