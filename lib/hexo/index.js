'use strict';

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  injector.loadStylusPlugin();
  injector.loadNexTPlugin();
  injector.config().deeplyApply('terser', {
    enable: true,
    path: 'js/injector.js',
    hash: 'md5',
    options: {}
  });
  require('./config')(hexo);
  require('./rm-filter')(hexo);
};
