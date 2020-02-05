/* global hexo */

'use strict';

const Injector = require('./injector');
const {resolve} = require('path');
const {Cache} = require('hexo-util');
const {nodes} = require('stylus');
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

//filter.register('after_route_render', require('./filter')(hexo, cache));

filter.register('stylus:renderer', style => {
  style.define('injector', data => {
    let expr = new nodes.Expression()
    expr.isList = true;
    injector.get(data.val).list()
      .map(item => resolve(hexo.base_dir, item.value))
      .map(item => new nodes.String(item))
      .forEach(item => expr.push(item));
    let each = new nodes.Each('$inject_val', '$inject_key', expr,
      new nodes.Import(new nodes.Ident('$inject_val'))
    );
    return each;
  });
});

