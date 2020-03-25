'use strict';

module.exports = hexo => {

  // If not use this md render, some feature will break.
  if (hexo.config.disable_cake_marked) return;

  const stripIndent = require('strip-indent');
  const injector = require('hexo-extend-injector2')(hexo);
  const {join} = require('path');

  // code
  hexo.extend.filter.register('marked:renderer', renderer => {
    let highlight = hexo.theme.config.highlight;
    if (highlight.engine === 'highlight.js') {
      let options = Object.assign({
        styles: 'github'
      }, highlight.options);
      let hljs;
      if (options.register) {
        hljs = require('highlight.js/lib/highlight.js');
        options.register.forEach(element => {
          hljs.registerLanguage(element, require('highlight.js/lib/languages/' + element));
        });
      } else {
        hljs = require('highlight.js');
      }
      renderer.code = (code, language, escaped) => {
        code = stripIndent(code);
        let isExist = hljs.getLanguage(language);
        if (isExist) {
          code = hljs.highlight(language, code).value;
        } else {
          code = hljs.highlightAuto(code).value;
        }
        return `{% raw %}<pre><code class="${language}">${code}</code></pre>{% endraw %}`;
      };
    }
  });

  hexo.extend.filter.register('before_generate', () => {
    let highlight = hexo.theme.config.highlight;
    highlight.options = highlight.options || {};
    if (highlight.engine === 'highlight.js') {
      let style =  highlight.options.style || 'github';
      let value = join(hexo.base_dir, `node_modules/highlight.js/styles/${style}.css`);
      injector.register('style', {value, isRun: true});
    }
  });
};
