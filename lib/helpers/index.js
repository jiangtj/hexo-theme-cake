'use strict';

module.exports = hexo => {
  require('./cake-image')(hexo);
  require('./cake-title')(hexo);
  require('./favicon')(hexo);
  require('./post_nav')(hexo);
};
