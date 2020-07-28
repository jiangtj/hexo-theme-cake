'use strict';

module.exports = hexo => {

  const { htmlTag } = require('../utils');

  hexo.extend.helper.register('favicon', function() {
    const favicons = hexo.theme.config.head.favicons;
    if (!favicons) {
      return '';
    }
    return favicons
      .map(item => {
        item.href = this.url_for(item.href);
        return item;
      })
      .map(item => htmlTag('link', item))
      .join('');
  });
};
