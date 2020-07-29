'use strict';

const { readFileSync } = require('fs');

module.exports = hexo => {

  const injector = require('hexo-extend-injector2')(hexo);

  // todo wait compatible
  // const { loadUtil } = require('../../utils');
  // const load = loadUtil(hexo);
  // if (!hexo.config.disable_marked_highlight) {
  //   hexo.config.highlight.enable = false;
  //   return load('hexo-filter-marked-highlight');
  // }

  // hljs
  const hljsCfg = Object.assign({theme: 'default'}, hexo.config.highlight, {hljs: true});
  hexo.config.highlight = hljsCfg;
  const resolveHljsThemePath = name => {
    if (!name) {
      return undefined;
    }
    return require.resolve(`highlight.js/styles/${name}.css`);
  };
  if (hljsCfg.enable) {
    require('./load-css')(hexo)({
      light: resolveHljsThemePath(hljsCfg.theme),
      dark: resolveHljsThemePath(hljsCfg.theme_dark)
    });
  }

  // prism
  const prismCfg = Object.assign({theme: 'default'}, hexo.config.prismjs);
  hexo.config.prismjs = prismCfg;
  const resolvePrismThemePath = name => {
    if (!name) {
      return undefined;
    }
    if (name === 'default') {
      // eslint-disable-next-line node/no-extraneous-require
      return require.resolve('prismjs/themes/prism.css');
    }
    return require.resolve(`prismjs/themes/prism-${name}.css`);
  };
  if (prismCfg.enable) {
    require('./load-css')(hexo)({
      light: resolvePrismThemePath(prismCfg.theme),
      dark: resolvePrismThemePath(prismCfg.theme_dark)
    });
    if (!prismCfg.preprocess) {
      // eslint-disable-next-line node/no-extraneous-require
      injector.register('js', readFileSync(require.resolve('prismjs'), 'utf-8'));
    }
    if (prismCfg.line_number) {
      // eslint-disable-next-line node/no-extraneous-require
      injector.register('style', readFileSync(require.resolve('prismjs/plugins/line-numbers/prism-line-numbers.css'), 'utf-8'));
      if (!prismCfg.preprocess) {
        // eslint-disable-next-line node/no-extraneous-require
        injector.register('js', readFileSync(require.resolve('prismjs/plugins/line-numbers/prism-line-numbers.js'), 'utf-8'));
      }
    }
  }

};
