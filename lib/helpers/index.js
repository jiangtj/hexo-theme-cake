'use strict';

const { ref } = require('../utils');

module.exports = hexo => {
  require('./cake-image')(hexo);
  require('./cake-title')(hexo);
  require('./favicon')(hexo);


  const options = ref(() => hexo.theme.config.post.navigation);
  hexo.extend.helper.register('post_nav', require('./post-nav')(options));
};
