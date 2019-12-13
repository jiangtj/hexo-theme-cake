/* global hexo */

'use strict';

hexo.extend.helper.register('next_js', function(...urls) {
  let version = hexo.locals.get('cake').theme.version;
  let cdn = hexo.theme.config.cdn;
  return urls
    .map((url) => {
      if (cdn && cdn.js) {
        return cdn.js
          .replace(/\$\{version\}/g, version)
          .replace(/\$\{file\}/g, url);
      }
      return `js/${url}?v=${version}`;
    })
    .map((url) => this.js(url))
    .join('');
});
