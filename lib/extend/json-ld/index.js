'use strict';

module.exports = hexo => {
  if (hexo.config.json_ld === false) return;

  const injector = require('hexo-extend-injector2')(hexo);
  const { Cache } = require('hexo-util');
  const cache = new Cache();
  const { helper, filter } = hexo.extend;

  let full_url_for = helper.get('full_url_for').bind(hexo);

  injector.register('head-end', {
    predicate: ctx => ctx.is_post() || ctx.is_page(),
    value    : ctx => {
      let { page, author, theme } = ctx;
      let ld = {
        '@context'        : 'https://schema.org',
        '@type'           : 'Article',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id'  : full_url_for(page.path)
        },
        'headline'     : page.title,
        'image'        : cache.get(page.full_source) || [],
        'datePublished': page.date,
        'dateModified' : page.updated,
        'author'       : {
          '@type': 'Person',
          'name' : author
        },
        'publisher': {
          '@type': 'Organization',
          'name' : author,
          'logo' : {
            '@type': 'ImageObject',
            'url'  : full_url_for(theme.avatar.url || 'images/avatar.gif')
          }
        }
      };
      return `<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
    }
  });

  filter.register('marked:renderer', function(renderer) {
    let originalRender = renderer.image;
    renderer.image =  (...args) => {
      let href = args[0];
      let source = renderer.options.config.source;
      if (source) {
        let arr = cache.get(source) || [];
        arr.push(href);
        cache.set(source, arr);
      }
      return originalRender.apply(renderer, args);
    };
  });

};
