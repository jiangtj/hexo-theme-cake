/* global hexo */

'use strict';

hexo.extend.filter.register('marked:image', function(data) {
  let { href, text } = data;
  data.content = `<img data-src="${href}" alt="${text}">`;
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
