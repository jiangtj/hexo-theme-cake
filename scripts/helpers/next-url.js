/**
 * next-url.js | https://theme-next.org/api/helpers/next-url/
 */

/* global hexo */

'use strict';

hexo.extend.helper.register('next_url', function(path, text, options) {
  var htmlTag = require('hexo-util').htmlTag;
  var config = this.config;
  var url = require('url');
  var data = url.parse(path);
  var siteHost = url.parse(config.url).hostname || config.url;

  var theme = hexo.theme.config;
  var tag = 'a';
  var attrs = { href: this.url_for(path) };

  options = options || {};

  var keys = Object.keys(options);
  var key = '';

  for (var i = 0, len = keys.length; i < len; i++) {
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
