'use strict';

module.exports = hexo => {
  require('./cake-image')(hexo);
  require('./cake-title')(hexo);
  require('./canonical')(hexo);
  require('./favicon')(hexo);
  require('./next-config')(hexo);
  require('./next-js')(hexo);
  require('./next-url')(hexo);
  require('./post_nav')(hexo);
};
