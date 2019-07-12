/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function(data) {
  let lozad = hexo.theme.config.lozad;
  
  if (!lozad.enable) return;

  var cheerio;
  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, {decodeEntities: false});

  $('img').each(function() {
    let $image = $(this);
    // Add data-src
    let $imageSrc = $image.attr('src');
    $image.attr('data-src', $imageSrc).removeAttr('src');
    // Add background
    if (lozad.background && $imageSrc.split('?').length == 1) {
      $image.attr('data-background-image', lozad.background.replace('${src}', $imageSrc));
    }
  });

  data.content = $.html();
}, 0);

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
