'use strict';

module.exports = (hexo, config) => {

  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');

  if (config.load === 'cdn') {
    injector.register('bodyEnd', [
      `<script src="${config.cdn}" crossorigin="anonymous"></script>`,
      '<script>lozad(\'[data-src]\').observe();</script>'
    ].join(''));
    return;
  }

  injector.register('js', join(hexo.plugin_dir, 'lozad', require('lozad/package.json').main), () => true, 1);
  injector.register('js', 'lozad(\'[data-src]\').observe();');
};
