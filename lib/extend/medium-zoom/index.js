'use strict';

module.exports = hexo => {

  const config = Object.assign({
    enable: true,
    load: 'bundler',
    selector: '.post-body img:not([data-zoomable="false"]), [data-zoomable]:not([data-zoomable="false"])'
  }, hexo.config.medium_zoom);

  hexo.config.medium_zoom = config;

  if (!config.enable) return;

  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');

  if (config.load === 'cdn') {
    injector.register('bodyEnd', [
      `<script src="${config.cdn}" crossorigin="anonymous"></script>`,
      `<script>mediumZoom('${config.selector}', {background: 'var(--bg-color, #fff)'});</script>`
    ].join(''));
    return;
  }

  injector.register('js', join(hexo.plugin_dir, 'medium-zoom', require('medium-zoom/package.json').main), () => true, 1);
  injector.register('js', `mediumZoom('${config.selector}', {background: 'var(--bg-color, #fff)'});`);
};
