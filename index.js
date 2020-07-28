/* global hexo */
'use strict';

if (hexo.config.theme !== 'cake') {
  return;
}

const { deepMerge } = require('hexo-util');

const { sep, join } = require('path');
// eslint-disable-next-line node/no-extraneous-require
const { makeRe } = require('micromatch');
const Theme = require(join(hexo.plugin_dir, 'hexo/lib/theme'));

hexo.theme_dir = join(hexo.plugin_dir, 'hexo-theme-cake') + sep;
hexo.theme_script_dir = join(hexo.theme_dir, 'scripts') + sep;
hexo.theme = new Theme(hexo);
const ignored = ['**/node_modules/hexo-theme-*/node_modules/**', '**/node_modules/hexo-theme-*/.git/**'];
hexo.theme.ignore = ignored;
hexo.theme.options.ignored = ignored.map(item => makeRe(item));
require('./lib/load')(hexo);

// load theme_config before generate
hexo.extend.filter.register('before_generate', () => {
  if (hexo.config.theme_config) {
    hexo.theme.config = deepMerge(hexo.theme.config, hexo.config.theme_config);
  }
}, -999);
