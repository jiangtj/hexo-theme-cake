/* global hexo */

'use strict';

const path = require('path');
const {Cache} = require('hexo-util');
const cache = new Cache();

// add to postBodyEnd
hexo.extend.filter.register('theme_inject', function(injector) {
  let theme = hexo.theme.config;
  injector.register('postBodyEnd', {
    predicate: ctx => ctx.page.reward_settings.enable && !ctx.is_index,
    value    : ctx => {
      let comment = `<div>${theme.reward_settings.comment}</div>`;
      let box = `<div class="reward-box">${hexo.theme.injector.get('reward').text(ctx)}</div>`;
      let buttons = Object.keys(theme.reward).map(name => {
        let options = theme.reward[name];
        let icon = options.icon ? `<i class="${options.icon}" aria-hidden="true"></i>` : options.name;
        return `<a class="reward-button ${name}"><span>${icon}</span></a>`;
      });
      let group = `<div class="reward-group">${buttons.join('')}</div>`;
      return `<div class="reward-container">${comment}${box}${group}</div>`;
    }
  });
}, 120);

// add to reward style
hexo.extend.filter.register('theme_inject', function(injector) {
  let rewards = hexo.theme.config.reward;

  if (!rewards) {
    hexo.theme.config.reward_settings.enable = false;
    return;
  }

  Object.keys(rewards).forEach(name => {
    let options = rewards[name];
    let layout = options.layout || path.join(hexo.theme_dir, 'layout/_partials/post/reward/simple.ejs');
    injector.register('reward', (ctx) => {
      return cache.apply(name, () => {
        if (options.image) {
          options.image = ctx.url_for(options.image);
        }
        return hexo.render.renderSync({path: layout}, {name, options});
      });
    });
  });
});
