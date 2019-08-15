/* global hexo */

'use strict';

hexo.extend.helper.register('next_js', function(...urls) {
  let version = this.next_env('version');
  return urls.map((url) => this.js(`js/${url}?v=${version}`)).join('');
});
