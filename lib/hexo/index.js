'use strict';

module.exports = hexo => {
  require('./config')(hexo);
  require('./rm-filter')(hexo);
};
