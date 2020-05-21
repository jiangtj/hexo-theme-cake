'use strict';

module.exports = hexo => {
  require('./lozad')(hexo);
  require('./medium-zoom')(hexo);
  require('./reward')(hexo);
  require('./json-ld')(hexo);
};
