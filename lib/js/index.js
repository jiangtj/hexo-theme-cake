'use strict';

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');

  injector.register('js', join(__dirname, 'next-boot.js'));
}
