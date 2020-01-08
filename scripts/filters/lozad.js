/* global hexo */

'use strict';

const {encodeURL, Cache} = require('hexo-util');
const cache = new Cache();

hexo.extend.filter.register('marked:renderer', function(renderer) {
  if (!hexo.theme.config.lozad.enable) return;
  renderer.image = function(href, title, text) {
    let titleAttr = title ? ` title="${title}"` : '';
    let textAttr = text ? ` alt="${text}"` : '';
    return `<img data-src="${encodeURL(href)}"${titleAttr}${textAttr}>`;
  };
}, 99);

hexo.extend.filter.register('theme_inject', function(injector) {
  let lozad = hexo.theme.config.lozad;
  if (!lozad.enable) return;
  injector.register('bodyEnd', () => {
    return cache.apply('cache', () => [
      `<script src="${lozad.cdn}" crossorigin="anonymous"></script>`,
      '<script>lozad(\'[data-src]\').observe();</script>'
    ].join(''));
  });
});
