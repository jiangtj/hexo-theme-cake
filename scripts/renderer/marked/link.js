/* global hexo */

'use strict';

const {encodeURL} = require('hexo-util');
const {filter} = hexo.extend;

filter.register('marked:link', (data, options) => {
  let { href, title, text } = data;
  if (!options.autolink && href === text && title == null) {
    return href;
  }
  data.href = encodeURL(href);
  let titleAttr = title ? ` title="${title}"` : '';
  data.content = `<a href="${data.href}"${titleAttr}>${text}</a>`;
});
