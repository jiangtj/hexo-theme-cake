/* global hexo */

const { sep, join } = require('path');
const Theme = require(join(hexo.plugin_dir, 'hexo/lib/hexo/theme'));

if (hexo.config.theme !== 'hexo-theme-cake') {
  return;
}
hexo.theme_dir = join(hexo.plugin_dir, 'hexo-theme-cake');
hexo.theme_script_dir = join(hexo.theme_dir, 'scripts') + sep;
hexo.theme = new Theme(hexo);
require('./lib/load')(hexo);
