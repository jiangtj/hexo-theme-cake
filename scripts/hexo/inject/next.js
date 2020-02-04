/* global hexo */
/**
 * Compatible with next theme injector
 */

const {filter} = hexo.extend;
const points = require('../../events/lib/injects-point');

filter.register('theme_inject', injects => {
  let injector = hexo.extend.injector2;
  // stylus
  points.styles.forEach(type => {
    injects[type].files.forEach(file => injector.register(type, file, () => true, 10, true));
  });
  // view
  points.views.forEach(type => {
    injects[type].raws
      .map((injectObj, index) => {
        let name = injectObj.name;
        let layout = `inject/${type}/${name}`;
        let locals = injectObj.args[0];
        let options = injectObj.args[1];
        let order = injectObj.args[2] || index;
        let value = ctx => ctx.partial(layout, locals, options);
        return {value, priority: order, name, layout, locals, options, isRun: true};
      })
      .sort((a, b) => b.priority - a.priority)
      .forEach(data => injector.register(type, data));
  });
}, Number.MAX_VALUE);
