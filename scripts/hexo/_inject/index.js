'use strict';

const Injector = require('./injector');
const {resolve} = require('path');
const {Cache} = require('hexo-util');
const {nodes} = require('stylus');
const cache = new Cache();

const initInjector = ctx => {
  if (ctx.extend.injector2) {
    return ctx.extend.injector2;
  }

  const injector = new Injector();
  ctx.extend.injector2 = injector;
  const {helper, filter} = ctx.extend;

  ctx.on('generateBefore', () => {
    injector.clean();
  });

  helper.register('injector', function(point) {
    cache.set(`${injector.formatKey(point)}`, true);
    return injector.get(point, {context: this});
  });

  filter.register('stylus:renderer', style => {
    style.define('injector', data => {
      let expr = new nodes.Expression()
      expr.isList = true;
      injector.get(data.val).list()
        .map(item => resolve(ctx.base_dir, item.value))
        .map(item => new nodes.String(item))
        .forEach(item => expr.push(item));
      return new nodes.Each('$inject_val', '$inject_key', expr,
        new nodes.Import(new nodes.Ident('$inject_val'))
      );
    });
  });

  //filter.register('after_route_render', require('./filter')(ctx, cache));

  require('./next')(filter, injector);

  return injector;
}

module.exports = initInjector;
