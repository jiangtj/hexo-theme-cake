'use strict';

/**
 * Javascript in html file
 */

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');
  let config = {
    root: hexo.config.root
  };
  injector.register('js', {
    value   : `var NexT = window.NexT || {};var CONFIG = ${JSON.stringify(config)};`,
    priority: -100
  });
  injector.register('js', {
    value   : join(__dirname, 'next-boot.js'),
    priority: 1
  });
};
