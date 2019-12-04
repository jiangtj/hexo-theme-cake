/* global hexo */

const {filter} = hexo.extend;
const {highlight, escapeHTML} = require('hexo-util');
const stripIndent = require('strip-indent');

// const beforePostRenders = filter.list().before_post_render;
// for (let fn of beforePostRenders) {
//   if (fn.name === 'backtickCodeBlock') {
//     filter.unregister('before_post_render', fn);
//   }
// }

filter.register('marked:code', (data, options) => {
  data.content = highlight(stripIndent(data.code), {
    lang      : data.infostring,
    gutter    : true,
    wrap      : true,
    tab       : null,
    autoDetect: false
  });
  // data.content = `<escape>${content}</escape>`;
}, 20);
