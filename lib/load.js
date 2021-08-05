'use strict';

const { loadUtil } = require('./utils');

module.exports = hexo => {
  if (hexo.cake_scripts_loaded) {
    return;
  }
  hexo.cake_scripts_loaded = true;
  const load = loadUtil(hexo);
  return Promise.all([
    require('./icon')(hexo),
    require('./console/check')(hexo),
    require('./config')(hexo),
    require('./filters')(hexo),
    require('./helpers')(hexo),
    require('./hexo')(hexo),
    require('./js')(hexo),
    require('./css')(hexo),
    require('./tags')(hexo),
    require('./menu')(hexo),
    require('./sns')(hexo),
    require('./extend')(hexo),
    load('hexo-renderer-ejs'),
    load('hexo-renderer-stylus'),
    load('@jiangtj/hexo-patch-load-highlight-style')
  ]);
};
