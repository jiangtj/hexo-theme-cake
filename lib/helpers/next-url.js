/**
 * next-url.js | https://theme-next.org/api/helpers/next-url/
 */

'use strict';

module.exports = hexo => {

  hexo.extend.helper.register('next_url', function(path, text, options) {
    const htmlTag = require('hexo-util').htmlTag;
    const config = this.config;
    const url = require('url');
    const data = url.parse(path);
    const siteHost = url.parse(config.url).hostname || config.url;

    const tag = 'a';
    const attrs = { href: this.url_for(path) };

    options = options || {};

    const keys = Object.keys(options);
    let key = '';

    for (let i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      attrs[key] = options[key];
    }

    if (attrs.class && Array.isArray(attrs.class)) {
      attrs.class = attrs.class.join(' ');
    }

    // If it's external link, rewrite attributes.
    if (data.protocol && data.hostname !== siteHost) {
      attrs.external = null;
      attrs.rel = 'noopener';
      attrs.target = '_blank';
    }

    return htmlTag(tag, attrs, text, false);
  });
};
