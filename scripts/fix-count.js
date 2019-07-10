'use strict';

module.exports = function(hexo) {
  let visibleTags = 0;
  hexo.locals.get('tags').forEach((tag) => {
    if (tag.length) {
      visibleTags += 1;
    }
  })
  hexo.theme.config.visibleTags = visibleTags;
  let visibleCategories = 0;
  hexo.locals.get('categories').forEach((categorie) => {
    if (categorie.length) {
      visibleCategories += 1;
    }
  })
  hexo.theme.config.visibleCategories = visibleCategories;
};
