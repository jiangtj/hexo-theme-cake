'use strict';

const cheerio = require('cheerio');

module.exports = (hexo, config) => {
  hexo.extend.filter.register('marked:renderer', renderer => {
    const originalRender = renderer.image;
    renderer.image = (...args) => {
      let content = originalRender.apply(renderer, args);
      if (config.faster) {
        const href = args[0];
        content = content.replace(`src="${href}"`, `data-src="${href}"`);
      } else {
        const $ = cheerio.load(content, { decodeEntities: false });
        $('img').attr('data-src', $('img').attr('src'));
        $('img').removeAttr('src');
        content = $('body').html();
      }
      return content;
    };
  }, 99);
};
