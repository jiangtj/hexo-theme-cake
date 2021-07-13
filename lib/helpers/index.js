'use strict';

module.exports = hexo => {
  require('./cake-image')(hexo);
  require('./cake-title')(hexo);
  require('./favicon')(hexo);


  const theme = hexo.theme.config;
  hexo.extend.helper.register('post_nav', require('./post-nav')(theme.post.navigation));
};
