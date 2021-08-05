'use strict';

const { install } = require('@jiangtj/hexo-icon-svg-core/lib/install');
const { icon } = require('@jiangtj/hexo-icon-svg-core/lib/core');
const { faCss } = require('@jiangtj/hexo-icon-svg-core/lib/icons/fortawesome');

const compatibleFaInline = hexo => {
  function faInline(iconName, opts) {
    const options = opts || {prefix: 'fas'};
    const prefix = options.prefix;
    return icon({prefix: prefix, iconName: iconName}, {type: 'fa'});
  }
  hexo.extend.helper.register('fa_inline', faInline);
};

module.exports = hexo => {
  install(hexo);
  const injector = require('hexo-extend-injector2')(hexo);
  injector.register('style', faCss());

  compatibleFaInline(hexo);
};
