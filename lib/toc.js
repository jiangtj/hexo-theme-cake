'use strict';

const { join } = require('path');

module.exports = hexo => {
  hexo.extend.filter.register('marked:renderer', function(renderer) {
    let originalRender = renderer.heading.bind(renderer);
    renderer.heading = (text, level) => {
      if (renderer.options.config.path) {
        let cache = require('hexo/lib/plugins/helper/toc').cache;
        let arr = cache.get(renderer.options.config.path) || [];
        arr.push({ text, level });
        cache.set(renderer.options.config.path, arr);
      }
      return originalRender(text, level);
    };
  });

};
