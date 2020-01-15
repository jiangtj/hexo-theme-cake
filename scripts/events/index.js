/* global hexo */

'use strict';

hexo.extend.filter.register('before_generate', () => {
  require('./lib/injects')(hexo);
});
