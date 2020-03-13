'use strict';

module.exports = hexo => {
  const ejs = require('hexo-renderer-ejs/lib/renderer');
  const marked = require('hexo-renderer-marked/lib/renderer');
  const stylus = require('hexo-renderer-stylus/lib/renderer');
  const { renderer, filter } = hexo.extend;
  filter.register('after_init', () => {
    renderer.register('ejs', 'html', ejs, true);
    renderer.register('md', 'html', marked);
    renderer.register('markdown', 'html', marked);
    renderer.register('mkd', 'html', marked);
    renderer.register('mkdn', 'html', marked);
    renderer.register('mdwn', 'html', marked);
    renderer.register('mdtxt', 'html', marked);
    renderer.register('mdtext', 'html', marked);
    renderer.register('styl', 'css', stylus);
    renderer.register('stylus', 'css', stylus);
  });
};
