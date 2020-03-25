'use strict';

/**
 * Javascript in html file
 */

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');

  injector.register('js', {
    value   : join(__dirname, 'next-boot.js'),
    priority: 1
  });
};
