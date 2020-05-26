'use strict';

const cheerio = require('cheerio');
const { isExternalLink } = require('hexo-util');

module.exports = hexo => {

  let options = Object.assign({
    enable : true,
    target : '_blank',
    rel    : 'noopener',
    exclude: []
  }, hexo.config.marked_external_link);

  if (!options.enable) return;

  // disable dafault external_link
  hexo.config.external_link = {enable: false};

  hexo.extend.filter.register('marked:renderer', function(renderer) {
    let originalRender = renderer.link;
    renderer.link =  (...args) => {
      let content = originalRender.apply(renderer, args);
      let [href] = args;
      if (isExternalLink(href, renderer.options.config.url, options.exclude)) {
        let $ = cheerio.load(content, { decodeEntities: false });
        if (options.target) {
          $('a').attr('target', options.target);
        }
        if (options.rel) {
          $('a').attr('rel', options.rel);
        }
        content = $('body').html();
      }
      return content;
    };
  });
};
