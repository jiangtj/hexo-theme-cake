'use strict';

const { faCss, faInline } = require('./fa');

module.exports = hexo => {
  hexo.extend.helper.register('fa_inline', faInline);

  const injector = require('hexo-extend-injector2')(hexo);
  injector.register('style', faCss());

  hexo.extend.tag.register('fa_inline', args => {
    const iconName = args[0];
    const prefix = args[1] || 'fas';
    return faInline(iconName, {prefix: prefix});
  });
};
