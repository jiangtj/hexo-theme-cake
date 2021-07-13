'use strict';

module.exports = hexo => {
  require('./bilibili')(hexo);
  require('./note')(hexo);
  require('./preview')(hexo);

  const iconFn = params => {
    const data = params.split(' ');
    const fa = hexo.extend.helper.get('fa_inline');
    return fa(data[1].substring(3), {prefix: data[0]});
  };

  const postButton = require('./button')(hexo, iconFn);
  hexo.extend.tag.register('button', postButton);
  hexo.extend.tag.register('btn', postButton);

  const postVideo = require('./video');
  hexo.extend.tag.register('video', postVideo);
};
