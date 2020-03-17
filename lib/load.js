'use strict';

const { join } = require('path');

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
  // load plugin
  const { filter } = hexo.extend;
  const load = loadUtil(hexo);
  filter.register('after_init', () => {
    load('hexo-fontawesome');
  });
};
