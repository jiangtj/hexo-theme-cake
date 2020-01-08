/* global hexo */

'use strict';

hexo.extend.helper.register('next_inject', function(point) {
  let content = hexo.theme.injector.get(point).text(this);
  return content;
  // return hexo.theme.config.injects[point]
  //   .map(item => this.partial(item.layout, item.locals, item.options))
  //   .join('');
});

hexo.extend.helper.register('next_inject_rendered', function(point) {
  let list = hexo.theme.injector.get(point).rendered(this);
  return list;
});
