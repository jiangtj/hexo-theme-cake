'use strict';

const Injector = require('./lib/injector');
const { Cache } = require('hexo-util');
const cache = new Cache();

const initInjector = ctx => {
  if (ctx.extend.injector2) {
    return ctx.extend.injector2;
  }

  try {
    return require('hexo-extend-injector2')(ctx);
  } catch (error) {
    ctx.log.info('Not found hexo-extend-injector2, load build in injector2.')
  }

  const injector = new Injector();
  ctx.extend.injector2 = injector;
  ctx.on('generateBefore', () => {
    injector.clean();
  });

  const { helper, filter } = ctx.extend;

  helper.register('injector', function (point) {
    cache.set(`${injector.formatKey(point)}`, true);
    return injector.get(point, { context: this });
  });

  injector.loadStylusPlugin = () => require('./lib/stylus')(ctx, filter, injector);
  injector.loadNexTPlugin = () => require('./lib/next')(filter, injector);
  //filter.register('after_route_render', require('./filter')(ctx, cache));

  return injector;
}

module.exports = initInjector;
