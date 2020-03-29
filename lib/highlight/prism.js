'use strict';

module.exports = (hexo, options) => {

  const stripIndent = require('strip-indent');
  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');
  const { escapeHTML } = require('hexo-util');

  options = Object.assign({
    load     : 'bundler',
    theme    : 'default',
    languages: ['markup', 'css', 'clike', 'javascript'],
    plugins  : [
      {name: 'line-numbers', css: true, class: {pre: ['line-numbers']}}
    ]
  }, options);

  let resolveComponentPath = name => {
    return join(hexo.base_dir, `node_modules/prismjs/components/prism-${name}.js`);
  };

  let resolveThemePath = name => {
    if (name === 'default') {
      return join(hexo.base_dir, 'node_modules/prismjs/themes/prism.css');
    }
    return join(hexo.base_dir, `node_modules/prismjs/themes/prism-${name}.css`);
  };

  let resolvePluginJsPath = name => {
    return join(hexo.base_dir, `node_modules/prismjs/plugins/${name}/prism-${name}.js`);
  };

  let resolvePluginCssPath = name => {
    return join(hexo.base_dir, `node_modules/prismjs/plugins/${name}/prism-${name}.css`);
  };

  if (options.load === 'bundler') {
    let preClass = '';
    let codeClass = '';
    injector.register('style', resolveThemePath(options.theme));
    injector.register('js', resolveComponentPath('core'));
    options.languages.forEach(element => {
      injector.register('js', resolveComponentPath(element));
    });
    options.plugins.forEach(element => {
      injector.register('js', resolvePluginJsPath(element.name));
      if (element.css) {
        injector.register('style', resolvePluginCssPath(element.name));
      }
      if (element.class) {
        if (element.class.pre) {
          preClass = ` class='${element.class.pre.join(' ')}'`;
        }
        if (element.class.code) {
          codeClass = ' ' + element.class.pre.join(' ');
        }
      }
    });
    hexo.extend.filter.register('marked:renderer', renderer => {
      renderer.code = (code, language, escaped) => {
        code = escapeHTML(stripIndent(code));
        return `{% raw %}<pre${preClass}><code class="language-${language}${codeClass}">${code}</code></pre>{% endraw %}`;
      };
    });
  }

  if (options.load === 'node') {
    injector.register('style', resolveThemePath(options.theme));
    const Prism = require('prismjs');
    const loadLanguages = require('prismjs/components/');
    loadLanguages.silent = true;
    loadLanguages(options.languages);
    hexo.extend.filter.register('marked:renderer', renderer => {
      renderer.code = (code, language, escaped) => {
        code = stripIndent(code);
        if (Prism.languages[language]) {
          code = Prism.highlight(code, Prism.languages[language], language);
        }
        return `{% raw %}<pre><code class="${language}">${code}</code></pre>{% endraw %}`;
      };
    });
  }
};
