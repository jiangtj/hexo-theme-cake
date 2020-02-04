/* global hexo */

'use strict';

const Injector = require('./injector');
const {resolve} = require('path');
const {Cache} = require('hexo-util');
const {helper, filter} = hexo.extend;
const cache = new Cache();

const injector = new Injector();
hexo.extend.injector2 = injector;
hexo.on('generateBefore', () => {
  injector.clean();
});

helper.register('injector', function(point) {
  cache.set(`${injector.formatKey(point)}`, true);
  return injector.get(point, {context: this});
});

filter.register('after_route_render', require('./filter')(hexo, cache));

filter.register('stylus', style => {
  style.define('injector', data => {
    return injector.get(data.val).list().map(item => resolve(hexo.base_dir, item.value));;
  });
});

