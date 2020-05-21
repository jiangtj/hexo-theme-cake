'use strict';

module.exports = hexo => {
  const {encodeURL} = require('hexo-util');
  hexo.extend.filter.register('marked:renderer', function(renderer) {
    renderer.image = function(href, title, text) {
      let titleAttr = title ? ` title="${title}"` : '';
      let textAttr = text ? ` alt="${text}"` : '';
      return `<img data-src="${encodeURL(href)}"${titleAttr}${textAttr}>`;
    };
  }, 99);
};
