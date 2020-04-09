/**
 * center-quote.js | https://theme-next.org/docs/tag-plugins/
 */

'use strict';

module.exports = hexo => {

  function centerQuote(args, content) {
    return '<blockquote class="center-quote">'
       + hexo.render.renderSync({text: content, engine: 'markdown'})
       + '</blockquote>';
  }

  hexo.extend.tag.register('centerquote', centerQuote, {ends: true});
  hexo.extend.tag.register('cq', centerQuote, {ends: true});
};
