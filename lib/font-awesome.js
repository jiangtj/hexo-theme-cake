'use strict';

const { library, dom, icon } = require('@fortawesome/fontawesome-svg-core');
const { fas } = require('@fortawesome/free-solid-svg-icons');
const { far } = require('@fortawesome/free-regular-svg-icons');
const { fab } = require('@fortawesome/free-brands-svg-icons');

try {
  library.add(fas, far, fab);
} catch (ex) {}

module.exports = hexo => {
  hexo.extend.filter.register('stylus:renderer', style => {
    style.define('fa_css', () => dom.css());
  });
  hexo.extend.helper.register('fa_icon', function(...args) {
    return icon(...args).html;
  });
};
