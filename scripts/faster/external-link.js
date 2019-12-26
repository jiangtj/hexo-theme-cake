/* global hexo */

const {filter} = hexo.extend;

const afterPostRenders = filter.list().after_post_render;
for (let fn of afterPostRenders) {
  if (fn.name === 'externalLinkFilter') {
    filter.unregister('after_post_render', fn);
  }
}
const afterRenders = filter.list()['after_render:html'];
for (let fn of afterRenders) {
  if (fn.name === 'externalLinkFilter') {
    filter.unregister('after_render:html', fn);
  }
}
