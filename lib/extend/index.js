'use strict';

module.exports = hexo => {
  return Promise.all([
    require('./lozad')(hexo),
    require('./medium-zoom')(hexo),
    require('./reward')(hexo),
    require('./external-link')(hexo),
    require('./json-ld')(hexo),
    require('./comment')(hexo),
    require('./font-size-preview')(hexo)
  ]);
};
