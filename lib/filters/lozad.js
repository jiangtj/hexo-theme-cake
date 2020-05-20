'use strict';

module.exports = hexo => {

  const {encodeURL} = require('hexo-util');
  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');

  hexo.extend.filter.register('marked:renderer', function(renderer) {
    if (!hexo.theme.config.lozad.enable) return;
    renderer.image = function(href, title, text) {
      let titleAttr = title ? ` title="${title}"` : '';
      let textAttr = text ? ` alt="${text}"` : '';
      return `<img data-src="${encodeURL(href)}"${titleAttr}${textAttr}>`;
    };
  }, 99);

  hexo.extend.filter.register('before_generate', () => {
    let lozad = hexo.theme.config.lozad;
    if (!lozad.enable) return;

    if (lozad.load === 'cdn') {
      let value = [
        `<script src="${lozad.cdn}" crossorigin="anonymous"></script>`,
        '<script>lozad(\'[data-src]\').observe();</script>'
      ].join('');
      let isRun = true;
      injector.register('bodyEnd', {value, isRun});
      return;
    }

    injector.register('js', join(hexo.plugin_dir, 'lozad/dist/lozad.js'));
    injector.register('js', 'lozad(\'[data-src]\').observe();');
  });
};
