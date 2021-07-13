'use strict';

const { htmlTag } = require('../utils');

module.exports = optionsRef => function() {
  const favicons = optionsRef.value();
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
};
