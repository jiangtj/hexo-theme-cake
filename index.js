/* global hexo */

if (hexo.config.theme !== 'cake') {
  return;
}

const { sep, join } = require('path');
const Theme = require(join(hexo.plugin_dir, 'hexo/lib/theme'));

hexo.theme_dir = join(hexo.plugin_dir, 'hexo-theme-cake') + sep;
hexo.theme_script_dir = join(hexo.theme_dir, 'scripts') + sep;
hexo.theme = new Theme(hexo);
hexo.theme.ignore = ['**/node_modules/hexo-theme-*/node_modules', '**/node_modules/hexo-theme-*/.git/**'];
require('./lib/load')(hexo);