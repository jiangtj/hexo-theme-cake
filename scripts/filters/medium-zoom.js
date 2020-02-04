/* global hexo */

'use strict';

hexo.extend.filter.register('before_generate', () => {
  const injector = hexo.extend.injector2;
  let mediumZoom = hexo.theme.config.medium_zoom;
  if (!mediumZoom.enable) return;
  let value = [
    `<script src="${mediumZoom.cdn}" crossorigin="anonymous"></script>`,
    `<script>mediumZoom('${mediumZoom.selector}');</script>`
  ].join('');
  let isRun = true;
  injector.register('bodyEnd', {value, isRun});
});
