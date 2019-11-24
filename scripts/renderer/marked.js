/* global hexo */

'use strict';

// If not use this md render, some feature will break.
if (hexo.config.disable_cake_marked) return;

const marked = require('marked');
const {highlight} = require('hexo-util');

const renderer = new marked.Renderer();

renderer.heading = function(text, level) {
  let data = { text, level };
  hexo.execFilterSync('marked:heading', data, { args: [this.options] });
  return data.content;
};

renderer.link = function(href, title, text) {
  let data = { href, title, text };
  hexo.execFilterSync('marked:link', data, { args: [this.options] });
  return data.content;
};

renderer.image = function(href, title, text) {
  let data = { href, title, text };
  hexo.execFilterSync('marked:image', data, { args: [this.options] });
  return data.content;
};

hexo.config.marked = Object.assign({
  // hexo
  modifyAnchors: '',
  autolink     : true,
  // marked
  renderer     : renderer,
  langPrefix   : '',
  highlight(code, lang) {
    return highlight(code, {
      lang,
      gutter: false,
      wrap  : false
    });
  }
}, hexo.config.marked);

marked.setOptions(hexo.config.marked);

function render(data, options) {
  return marked(data.text, Object.assign({
    _headingId: []
  }, options));
}

hexo.extend.renderer.register('md', 'html', render, true);
hexo.extend.renderer.register('markdown', 'html', render, true);
hexo.extend.renderer.register('mkd', 'html', render, true);
hexo.extend.renderer.register('mkdn', 'html', render, true);
hexo.extend.renderer.register('mdwn', 'html', render, true);
hexo.extend.renderer.register('mdtxt', 'html', render, true);
hexo.extend.renderer.register('mdtext', 'html', render, true);
