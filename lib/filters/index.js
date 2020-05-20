'use strict';

module.exports = hexo => {
  require('./comment/disqus')(hexo);
  require('./post-body-end/reward')(hexo);
  require('./front-matter')(hexo);
};
