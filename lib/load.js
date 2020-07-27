'use strict';

const { loadUtil } = require('./utils');

module.exports = hexo => {
  if (hexo.cake_scripts_loaded) {
    return;
  }
  hexo.cake_scripts_loaded = true;
  // load script
  require('./console/check')(hexo);
  require('./config')(hexo);
  require('./filters')(hexo);
  require('./helpers')(hexo);
  require('./hexo')(hexo);
  require('./js')(hexo);
  require('./css')(hexo);
  require('./tags')(hexo);
  require('./font-awesome')(hexo);
  require('./menu')(hexo);
  require('./sns')(hexo);
  require('./extend')(hexo);
  // load plugin
  const load = loadUtil(hexo);
  load('hexo-fontawesome');
  load('hexo-renderer-ejs');
};
