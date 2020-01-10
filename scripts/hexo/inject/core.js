'use strict';

const Injector = require('./injector');

module.exports = hexo => {
  const injector = new Injector();
  hexo.extend.injector2 = injector;
  hexo.execFilterSync('injector', injector);
};
