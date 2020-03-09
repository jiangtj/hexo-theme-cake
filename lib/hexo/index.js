'use strict';

module.exports = hexo => {

  const injector = require('hexo-extend-injector2')(hexo);
  injector.loadStylusPlugin();
  injector.loadNexTPlugin();
};
