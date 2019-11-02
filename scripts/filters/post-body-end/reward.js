/* global hexo */

'use strict';

const path = require('path');

// add to postBodyEnd
hexo.extend.filter.register('theme_inject', function(injects) {
  let theme = hexo.theme.config;
  injects.postBodyEnd.raw('reward.ejs', `
  <% if (page.reward_settings.enable && !is_index) { %>
    <%- partial('_partials/post/reward.ejs') -%>
  <% } %>
  `, {}, {}, theme.reward_settings.inject_order);
}, 120);

// add to reward style
hexo.extend.filter.register('theme_inject', function(injects) {
  let rewards = hexo.theme.config.reward;

  if (!rewards) {
    hexo.theme.config.reward_settings.enable = false;
    return;
  }

  Object.keys(rewards).forEach((reward_name) => {
    let reward_item = rewards[reward_name];
    let layout = reward_item.layout;
    injects.reward.file(reward_name, layout || path.join(hexo.theme_dir, 'layout/_partials/post/reward/simple.ejs'), {
      reward_name,
      reward_item
    }, {cache: true});
  });
});
