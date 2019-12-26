/* global hexo */

const {filter} = hexo.extend;

const beforePostRenders = filter.list().before_post_render;
for (let fn of beforePostRenders) {
  if (fn.name === 'backtickCodeBlock') {
    filter.unregister('before_post_render', fn);
  }
}
