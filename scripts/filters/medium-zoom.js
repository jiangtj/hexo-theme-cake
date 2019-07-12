/* global hexo */

'use strict';

hexo.extend.filter.register('theme_inject', function(injects) {

  if (!hexo.theme.config.medium_zoom) return;

  injects.bodyEnd.raw('medium-zoom', `
  <script src="https://cdn.jsdelivr.net/npm/medium-zoom@1.0.4/dist/medium-zoom.min.js" crossorigin="anonymous"></script>
  <script>
    const images = [
      ...document.querySelectorAll('.post-body img'),
      ...document.querySelectorAll('[data-zoomable]'),
    ]
    mediumZoom(images)
  </script>
  `, {}, {cache: true});
});
