'use strict';

module.exports = hexo => {

  // config
  let config = Object.assign({
    enable : false,
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

  const {filter, helper} = hexo.extend;

  // helper
  const url_for = helper.get('url_for').bind(hexo);

  // locals
  let availableItems = Object.keys(config.items);
  filter.register('template_locals', locals => {
    const { page } = locals;
    page.reward = Object.assign({}, config, {items: availableItems}, page.reward);
  });

  // render box
  const renderBox = items => {
    return items
      .map(name => {
        return cache.apply(name, () => {
          let options = config.items[name];
          let layout = options.layout || join(__dirname, 'simple.ejs');
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
        let options = config.items[name];
        const fa = helper.get('fa_inline');
        let icon = options.icon ? fa(options.icon.name, options.icon.options) : options.name;
        return `<a class="reward-button ${name}"><span>${icon}</span></a>`;
      }).join('');
  };

  // injector
  injector.register('post-body-end', {
    predicate: ctx => ctx.page.reward.enable && !ctx.is_index,
    value    : ctx => {
      let {reward} = ctx.page;
      let comment = `<div>${reward.comment}</div>`;
      let box = `<div class="reward-box">${renderBox(reward.items)}</div>`;
      let buttons = renderButton(reward.items);
      let group = `<div class="reward-group">${buttons}</div>`;
      return `<div class="reward-container">${comment}${box}${group}</div>`;
    }
  });

  // style
  injector.register('variable', join(__dirname, 'variables.styl'));
  injector.register('style', join(__dirname, 'styles.styl'));

  // js script
  injector.register('js', join(__dirname, 'script.js'));
};
