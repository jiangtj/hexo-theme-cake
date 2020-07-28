'use strict';

module.exports = hexo => {
  if (hexo.config.json_ld === false) return;

  const injector = require('hexo-extend-injector2')(hexo);
  const { Cache } = require('hexo-util');
  const cache = new Cache();
  const { helper, filter } = hexo.extend;

  const full_url_for = helper.get('full_url_for').bind(hexo);

  injector.register('head-end', {
    predicate: ctx => ctx.is_post() || ctx.is_page(),
    value: ctx => {
      const { page, author } = ctx;
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': full_url_for(page.path)
        },
        'headline': page.title,
        'image': cache.get(page.full_source) || [],
        'datePublished': page.date,
        'dateModified': page.updated,
        'author': {
          '@type': 'Person',
          'name': author.name
        },
        'publisher': {
          '@type': 'Organization',
          'name': author.name,
          'logo': {
            '@type': 'ImageObject',
            'url': full_url_for(author.avatar.url)
          }
        }
      };
      return `<script type="application/ld+json">${JSON.stringify(ld)}</script>`;
    }
  });

  filter.register('marked:renderer', renderer => {
    const originalRender = renderer.image;
    renderer.image = (...args) => {
      const href = args[0];
      const source = renderer.options.config.source;
      if (source) {
        const arr = cache.get(source) || [];
        arr.push(href);
        cache.set(source, arr);
      }
      return originalRender.apply(renderer, args);
    };
  });

};
