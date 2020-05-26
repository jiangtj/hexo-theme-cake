'use strict';

const { join } = require('path');

const loadUtil = hexo => {
  const packagePath = join(hexo.base_dir, 'package.json');
  const deps = require(packagePath).dependencies;
  return name => {
    if (!deps[name]) {
      hexo.loadPlugin(hexo.resolvePlugin(name));
    }
  };
};

module.exports = hexo => {
  if (hexo.cake_scripts_loaded) {
    return;
  }
  hexo.cake_scripts_loaded = true;
  // load script
  require('./filters')(hexo);
  require('./helpers')(hexo);
  require('./hexo')(hexo);
  require('./js')(hexo);
  require('./tags')(hexo);
  require('./locals')(hexo);
  require('./font-awesome')(hexo);
  require('./social')(hexo);
  require('./extend')(hexo);
  // load plugin
  const load = loadUtil(hexo);
  load('hexo-fontawesome');
  load('hexo-renderer-ejs');
  hexo.config.highlight.enable = false;
  load('hexo-filter-marked-highlight');
  const { filter } = hexo.extend;
  filter.register('after_init', () => {
    load('@jiangtj/hexo-renderer-stylus');
  }, -100);
};
