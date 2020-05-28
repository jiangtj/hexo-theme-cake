'use strict';

const cheerio = require('cheerio');

module.exports = (hexo, config) => {
  hexo.extend.filter.register('marked:renderer', function(renderer) {
    let originalRender = renderer.image;
    renderer.image =  (...args) => {
      let content = originalRender.apply(renderer, args);
      if (config.faster) {
        let href = args[0];
        content = content.replace(`src="${href}"`, `data-src="${href}"`);
      } else {
        let $ = cheerio.load(content, { decodeEntities: false });
        $('img').attr('data-src', $('img').attr('src'));
        $('img').removeAttr('src');
        content = $('body').html();
      }
      return content;
    };
  }, 99);
};
