'use strict';

module.exports = hexo => {
  if (hexo.config.json_ld === false) return;

  const injector = require('hexo-extend-injector2')(hexo);
  injector.register('head-end', {
    predicate: ctx => ctx.is_post(),
    value    : ctx => {
      let ld = {
        '@type': 'BlogPosting'
      };
      return `<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
    }
  });
};
