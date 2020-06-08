'use strict';

module.exports = hexo => {
  require('./lozad')(hexo);
  require('./medium-zoom')(hexo);
  require('./reward')(hexo);
  require('./marked')(hexo);
  require('./highlight')(hexo);
  require('./external-link')(hexo);
  require('./json-ld')(hexo);
  require('./comment')(hexo);
  require('./font-size-preview')(hexo);
};
