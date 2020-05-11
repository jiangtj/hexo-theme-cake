'use strict';

module.exports = hexo => {
  require('./bilibili')(hexo);
  require('./button')(hexo);
  require('./note')(hexo);
  require('./preview')(hexo);
  require('./video')(hexo);
};
