'use strict';

module.exports = hexo => {
  require('./comment/disqus')(hexo);
  require('./head/pace')(hexo);
  require('./post-body-end/creative-commons')(hexo);
  require('./post-body-end/reward')(hexo);
  require('./post-body-end/tags')(hexo);
  require('./front-matter')(hexo);
  require('./lozad')(hexo);
  require('./marked')(hexo);
  require('./medium-zoom')(hexo);
};
