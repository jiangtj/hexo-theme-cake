/* global hexo */

const path = require('path');

hexo.locals.set('cake', () => {
  var hexoPKG = require(path.join(hexo.base_dir, 'package.json'));
  var themePKG = require(path.join(hexo.theme_dir, 'package.json'));
  return {
    hexo : hexoPKG,
    theme: themePKG
  };
});

hexo.extend.filter.register('template_locals', function(locals) {
  const { config } = this;
  const { __, site } = locals;
  // Hexo & NexT version
  locals.hexo_version = site.cake.hexo.hexo.version;
  locals.cake_version = site.cake.theme.version;
  // Disable language for site.
  locals.title = config.title;
  locals.subtitle = config.subtitle;
  locals.author = config.author;
  locals.description = config.description;
});
