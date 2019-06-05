/* global hexo */

'use strict';

function setDefaultEmptyView(viewPath) {
  let view = hexo.theme.getView(viewPath);
  if (!view) {
    hexo.theme.setView(viewPath, '');
  }
}

function setEmptyCommentsViews(fileName) {
  let config = hexo.theme.config.comments;
  if (!config.type) {
    return;
  }
  let viewPath = `_third-party/comments/${config.type}/${fileName}`;
  setDefaultEmptyView(viewPath);
}

hexo.extend.filter.register('before_generate', function() {
  setEmptyCommentsViews('count.swig');
  setEmptyCommentsViews('index.swig');
});
