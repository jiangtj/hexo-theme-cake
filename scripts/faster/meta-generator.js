/* global hexo */

const {filter} = hexo.extend;
hexo.config.meta_generator = false;

const afterRenders = filter.list()['after_render:html'];
for (let fn of afterRenders) {
  if (fn.name === 'hexoMetaGeneratorInject') {
    filter.unregister('after_render:html', fn);
  }
}
