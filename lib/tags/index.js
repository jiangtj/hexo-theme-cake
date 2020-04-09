'use strict';

module.exports = hexo => {
  require('./bilibili')(hexo);
  require('./button')(hexo);
  require('./center-quote')(hexo);
  require('./full-image')(hexo);
  require('./group-pictures')(hexo);
  require('./note')(hexo);
  require('./preview')(hexo);
  require('./video')(hexo);
};
