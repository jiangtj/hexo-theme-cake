'use strict';

module.exports = hexo => {

  hexo.extend.helper.register('next_js', function(...urls) {
    const version = hexo.locals.get('cake').theme.version;
    return urls.map(url => this.js(`js/${url}?v=${version}`)).join('');
  });
};
