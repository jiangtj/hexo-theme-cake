'use strict';

const { ref } = require('../utils');

module.exports = hexo => {
  require('./cake-image')(hexo);
  require('./cake-title')(hexo);

  const postNavRef = ref(() => hexo.theme.config.post.navigation);
  hexo.extend.helper.register('post_nav', require('./post-nav')(postNavRef));

  const faviconRef = ref(() => hexo.theme.config.head.favicons);
  hexo.extend.helper.register('favicon', require('./favicon')(faviconRef));
};
