'use strict';

module.exports = (hexo) => {
  hexo.locals.set('valid_categories', function() {
    return hexo.locals.get('categories')
      .filter(category => category.length !== 0);
  });
  hexo.locals.set('valid_tags', function() {
    return hexo.locals.get('tags')
      .filter(tag => tag.length !== 0);
  });
};
