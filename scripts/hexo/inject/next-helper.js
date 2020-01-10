/* global hexo */

'use strict';

hexo.extend.helper.register('next_inject', function(point) {
  return hexo.extend.injector2.get(point).text(this);
});

hexo.extend.helper.register('next_inject_rendered', function(point) {
  return hexo.extend.injector2.get(point).rendered(this);
});
