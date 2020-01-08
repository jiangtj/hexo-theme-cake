/* global hexo */

'use strict';

hexo.extend.helper.register('next_inject', function(point) {
  let content = hexo.theme.config.injector.getText(point, this);
  return content;
  // return hexo.theme.config.injects[point]
  //   .map(item => this.partial(item.layout, item.locals, item.options))
  //   .join('');
});

hexo.extend.helper.register('next_inject_list', function(point) {
  let list = hexo.theme.config.injector.get(point);
  console.log(list);
  return list;
});
