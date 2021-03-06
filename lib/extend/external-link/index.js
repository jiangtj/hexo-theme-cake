'use strict';

const cheerio = require('cheerio');
const { isExternalLink } = require('hexo-util');
const { isHexoRendererMarkedMini } = require('../../utils');

module.exports = hexo => {

  if (!isHexoRendererMarkedMini(hexo)) {
    return;
  }

  const options = Object.assign({
    enable: true,
    faster: true,
    target: '_blank',
    rel: 'noopener',
    exclude: []
  }, hexo.config.marked_external_link);

  if (!options.enable) return;

  // disable dafault external_link
  hexo.config.external_link = {enable: false};

  hexo.extend.filter.register('marked:renderer', renderer => {
    const originalRender = renderer.link;
    renderer.link = (...args) => {
      let content = originalRender.apply(renderer, args);
      const [href] = args;
      if (isExternalLink(href, hexo.config.url, options.exclude)) {
        if (options.faster) {
          if (!content.includes('rel="')) {
            content = content.replace('href="', `rel="${options.rel}" href="`);
          }
          if (!content.includes('target="')) {
            content = content.replace('href="', `target="${options.target}" href="`);
          }
        } else {
          const $ = cheerio.load(content, { decodeEntities: false });
          if (options.target) {
            if (!$('a').attr('target')) {
              $('a').attr('target', options.target);
            }
          }
          if (options.rel) {
            if (!$('a').attr('rel')) {
              $('a').attr('rel', options.rel);
            }
          }
          content = $('body').html();
        }
      }
      return content;
    };
  });
};
