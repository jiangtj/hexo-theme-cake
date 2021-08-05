'use strict';

const { install } = require('@jiangtj/hexo-icon-svg-core/lib/install');
const { faCss } = require('@jiangtj/hexo-icon-svg-core/lib/icons/fortawesome');

module.exports = hexo => {
  install(hexo);
  const injector = require('hexo-extend-injector2')(hexo);
  injector.register('style', faCss());
};
