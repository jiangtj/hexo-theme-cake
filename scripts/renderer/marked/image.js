/* global hexo */

'use strict';

const {encodeURL} = require('hexo-util');
const {filter} = hexo.extend;

filter.register('marked:image', (data, options) => {
  let { href, text } = data;
  data.href = encodeURL(href);
  data.content = `<img src="${data.href}" alt="${text}">`;
});
