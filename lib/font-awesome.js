'use strict';

// eslint-disable-next-line node/no-extraneous-require
const { faCss } = require('@jiangtj/hexo-icon-svg-core/lib/icons/fa');

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  injector.register('style', faCss());
};
