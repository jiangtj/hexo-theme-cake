'use strict';

const { loadUtil } = require('./utils');

module.exports = hexo => {
  if (hexo.cake_scripts_loaded) {
    return;
  }
  hexo.cake_scripts_loaded = true;
  // load script
  require('./config')(hexo);
  require('./filters')(hexo);
  require('./helpers')(hexo);
  require('./hexo')(hexo);
  require('./js')(hexo);
  require('./tags')(hexo);
  require('./font-awesome')(hexo);
  require('./menu')(hexo);
  require('./sns')(hexo);
  require('./extend')(hexo);
  // load plugin
  const load = loadUtil(hexo);
  load('hexo-fontawesome');
  load('hexo-renderer-ejs');
  const { filter } = hexo.extend;
  filter.register('after_init', () => {
    load('@jiangtj/hexo-renderer-stylus');
  }, -100);
};
