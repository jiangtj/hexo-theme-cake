/* global hexo */

'use strict';

const Injector = require('./injector');
const path = require('path');
const {helper, filter} = hexo.extend;

hexo.on('generateBefore', () => {
  const injector = new Injector();
  hexo.extend.injector2 = injector;
  hexo.execFilterSync('injector', injector);
});

helper.register('inject_list', function(point) { return hexo.extend.injector2.get(point).list(); });
helper.register('inject_bind', function(point) { return hexo.extend.injector2.get(point).bind(this); });
helper.register('inject_rendered', function(point) { return hexo.extend.injector2.get(point).rendered(this); });
helper.register('inject_text', function(point) { return hexo.extend.injector2.get(point).text(this); });

/**
 * Compatible with next theme injector
 */
const points = require('./next-point');
filter.register('injector', (injector) => {
  require('./next-injects')(hexo);
  // stylus
  points.styles.forEach(type => {
    hexo.theme.config.injects[type].forEach(file => injector.register(type, file));
    hexo.theme.config.injects[type] = injector.get(type).list().map(item => path.resolve(hexo.base_dir, item.value));
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
