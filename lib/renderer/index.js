'use strict';

module.exports = hexo => {

  const marked = require('./marked');
  hexo.config.marked = Object.assign({}, hexo.config.marked);

  const { filter } = hexo.extend;
  filter.register('after_init', () => {
    hexo.extend.renderer.register('md', 'html', marked, true);
    hexo.extend.renderer.register('markdown', 'html', marked, true);
    hexo.extend.renderer.register('mkd', 'html', marked, true);
    hexo.extend.renderer.register('mkdn', 'html', marked, true);
    hexo.extend.renderer.register('mdwn', 'html', marked, true);
    hexo.extend.renderer.register('mdtxt', 'html', marked, true);
    hexo.extend.renderer.register('mdtext', 'html', marked, true);
  });
};
