'use strict';

module.exports = hexo => {
  if (hexo.cake_scripts_loaded) {
    return;
  }
  hexo.cake_scripts_loaded = true;
  require('./filters')(hexo);
  require('./helpers')(hexo);
  require('./hexo')(hexo);
  require('./tags')(hexo);
  require('./locals')(hexo);
  require('./js')(hexo);
};
