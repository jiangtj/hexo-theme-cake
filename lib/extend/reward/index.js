'use strict';

module.exports = hexo => {

  // config
  const config = Object.assign({
    enable: false,
    default: true,
    comment: 'Buy me a cup of milkshake 🍨.'
  }, hexo.config.reward);

  if (!config.enable) return;

  config.enable = config.default;
  config.items = config.items || {};
  hexo.config.reward = config;

  // dep
  const {join} = require('path');
  const {Cache} = require('hexo-util');
  const cache = new Cache();
  const injector = require('hexo-extend-injector2')(hexo);
  const { icon } = require('@jiangtj/hexo-icon-svg-core/lib/core');

  const {filter, helper} = hexo.extend;

  // helper
  const url_for = helper.get('url_for').bind(hexo);

  // locals
  const availableItems = Object.keys(config.items);
  filter.register('template_locals', locals => {
    const { page } = locals;
    page.reward = Object.assign({}, config, {items: availableItems}, page.reward);
  });

  // render box
  const renderBox = items => {
    return items
      .map(name => {
        return cache.apply(name, () => {
          const options = config.items[name];
          const layout = options.layout || join(__dirname, 'simple.ejs');
          if (options.image) {
            options.image = url_for(options.image);
          }
          return hexo.render.renderSync({path: layout}, {name, options});
        });
      })
      .join('');
  };

  // render button
  const renderButton = items => {
    return items
      .map(name => {
        const options = config.items[name];
        const iconHtml = options.icon ? icon(options.icon.name, options.icon.options) : options.name;
        return `<a class="reward-button ${name}"><span>${iconHtml}</span></a>`;
      }).join('');
  };

  // injector
  injector.register('post-body-end', {
    predicate: ctx => ctx.page.reward.enable && !ctx.is_index,
    value: ctx => {
      const {reward} = ctx.page;
      const comment = `<div>${reward.comment}</div>`;
      const box = `<div class="reward-box">${renderBox(reward.items)}</div>`;
      const buttons = renderButton(reward.items);
      const group = `<div class="reward-group">${buttons}</div>`;
      return `<div class="reward-container">${comment}${box}${group}</div>`;
    }
  });

  // style
  injector.register('variable', join(__dirname, 'variables.styl'));
  injector.register('style', join(__dirname, 'styles.styl'));

  // js script
  injector.register('js', join(__dirname, 'script.js'));
};
