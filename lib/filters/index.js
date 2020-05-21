'use strict';

module.exports = hexo => {
  require('./comment/disqus')(hexo);
  require('./front-matter')(hexo);
};
