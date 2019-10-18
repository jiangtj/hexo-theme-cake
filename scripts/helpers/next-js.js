/* global hexo */

'use strict';

hexo.extend.helper.register('next_js', function(...urls) {
  let version = hexo.locals.get('cake').theme.version;
  return urls.map((url) => this.js(`js/${url}?v=${version}`)).join('');
});
