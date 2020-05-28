'use strict';

module.exports = hexo => {
  require('./lozad')(hexo);
  require('./medium-zoom')(hexo);
  require('./reward')(hexo);
  require('./marked')(hexo);
  require('./highlight')(hexo);
  require('./external-link')(hexo);
};
