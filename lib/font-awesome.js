'use strict';

// eslint-disable-next-line node/no-extraneous-require
const { dom } = require('@fortawesome/fontawesome-svg-core');

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  injector.register('style', dom.css());
};
