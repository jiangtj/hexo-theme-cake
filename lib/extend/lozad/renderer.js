'use strict';

const cheerio = require('cheerio');

module.exports = hexo => {
  hexo.extend.filter.register('marked:renderer', function(renderer) {
    let originalRender = renderer.image;
    renderer.image =  (...args) => {
      let content = originalRender.apply(renderer, args);
      let $ = cheerio.load(content, { decodeEntities: false });
      $('img').attr('data-src', $('img').attr('src'));
      $('img').removeAttr('src');
      return $('body').html();
    };
  }, 99);
};
