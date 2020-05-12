/* global hexo */

if (hexo.config.theme !== 'cake') {
  return;
}

const { sep, join } = require('path');
const { makeRe } = require('micromatch');
const Theme = require(join(hexo.plugin_dir, 'hexo/lib/theme'));

hexo.theme_dir = join(hexo.plugin_dir, 'hexo-theme-cake') + sep;
hexo.theme_script_dir = join(hexo.theme_dir, 'scripts') + sep;
hexo.theme = new Theme(hexo);
const ignored = ['**/node_modules/hexo-theme-*/node_modules/**', '**/node_modules/hexo-theme-*/.git/**'];
hexo.theme.ignore = ignored;
hexo.theme.options.ignored = ignored.map(item => makeRe(item));
require('./lib/load')(hexo);
