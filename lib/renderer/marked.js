'use strict';

const marked = require('marked');

marked.setOptions({
  langPrefix: ''
});

module.exports = function(data, options) {
  const siteCfg = Object.assign({}, {
    config: {
      url          : this.config.url,
      root         : this.config.root,
      relative_link: this.config.relative_link,
      path         : data.path
    }
  });

  // exec filter to extend renderer.
  const renderer = new marked.Renderer();
  this.execFilterSync('marked:renderer', renderer, {context: this});

  return marked(data.text, Object.assign({
    renderer
  }, this.config.marked, options, siteCfg));
};
