/* global hexo */

'use strict';

hexo.on('generateBefore', () => {
  require('./core')(hexo);
});

/**
 * Compatible with next theme injector
 */
const points = require('./next-point');
hexo.extend.filter.register('injector', (injector) => {
  require('./next-injects')(hexo);
  // stylus
  points.styles.forEach(type => {
    hexo.theme.config.injects[type].forEach(file => injector.register(type, file));
    hexo.theme.config.injects[type] = injector.get(type).list().map(item => item.value);
  });
  // view
  points.views.forEach(type => {
    hexo.theme.config.injects[type].forEach(item => {
      let {name, layout, locals, options, order} = item;
      let value = ctx => ctx.partial(layout, locals, options);
      injector.register(type, {value, priority: order, name, layout, locals, options});
    });
  });
});
