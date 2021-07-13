'use strict';

module.exports = hexo => {
  require('./bilibili')(hexo);
  require('./note')(hexo);
  require('./preview')(hexo);

  const postButton = require('./button')(hexo);
  hexo.extend.tag.register('button', postButton);
  hexo.extend.tag.register('btn', postButton);

  const postVideo = require('./video');
  hexo.extend.tag.register('video', postVideo);
};
