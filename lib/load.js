'use strict';

const loadUtil = hexo => name => {
  hexo.loadPlugin(hexo.resolvePlugin(name));
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
  require('./renderer')(hexo);
  require('./tags')(hexo);
  require('./locals')(hexo);
  require('./font-awesome')(hexo);
  require('./social')(hexo);
  // load plugin
  const load = loadUtil(hexo);
  load('hexo-fontawesome');
};
