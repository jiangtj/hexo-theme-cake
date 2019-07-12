/* global hexo */

'use strict';

// images.forEach(element => {
//   let hdAttr = element.getAttribute(mediumZoom.hd_attr);
//   if (hdAttr) {
//     element.setAttribute('data-zoom-src', hdAttr);
//   }
// });

hexo.extend.filter.register('theme_inject', function(injects) {
  let mediumZoom = hexo.theme.config.medium_zoom;

  if (!mediumZoom.enable) return;

  injects.bodyEnd.raw('medium-zoom', `
  <script src="${mediumZoom.cdn}" crossorigin="anonymous"></script>
  <script>
    const images = [
      ...document.querySelectorAll('.post-body img'),
      ...document.querySelectorAll('[data-zoomable]'),
    ]
    mediumZoom(images);
  </script>
  `, {}, {cache: true});
});
