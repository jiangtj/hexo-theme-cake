'use strict';

module.exports = hexo => {

  const injector = require('hexo-extend-injector2')(hexo);

  hexo.extend.filter.register('before_generate', () => {
    let mediumZoom = hexo.theme.config.medium_zoom;
    if (!mediumZoom.enable) return;
    let value = [
      `<script src="${mediumZoom.cdn}" crossorigin="anonymous"></script>`,
      `<script>mediumZoom('${mediumZoom.selector}');</script>`
    ].join('');
    let isRun = true;
    injector.register('bodyEnd', {value, isRun});
  });
};
