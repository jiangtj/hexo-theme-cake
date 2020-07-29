'use strict';

module.exports = hexo => {

  // todo wait compatible
  // const { loadUtil } = require('../../utils');
  // const load = loadUtil(hexo);
  // if (!hexo.config.disable_marked_highlight) {
  //   hexo.config.highlight.enable = false;
  //   return load('hexo-filter-marked-highlight');
  // }

  // hljs
  hexo.config.highlight = hexo.config.highlight || {};
  hexo.config.highlight.hljs = true;
  const hljsCfg = hexo.config.highlight;
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
  const prismCfg = hexo.config.prismjs || {};
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
  }

};
