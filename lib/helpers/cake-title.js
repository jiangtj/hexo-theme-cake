'use strict';

module.exports = hexo => {

  hexo.extend.helper.register('cake_title', function() {
    let {__, is_home, is_post, is_page, is_archive, is_category, is_tag} = this;
    let {page, title} = this;
    let cakeTitle = '';
    if (is_home()) {
      cakeTitle = title;
    } else if (is_post()) {
      cakeTitle = `${page.title} | ${title}`;
    } else if (is_page()) {
      let page_title_suffix = ' | ' + title;
      if (page.type === 'categories' && !page.title) {
        cakeTitle = __('title.category') + page_title_suffix;
      } else if (page.type === 'tags' && !page.title) {
        cakeTitle = __('title.tag') + page_title_suffix;
      } else {
        cakeTitle = page.title + page_title_suffix;
      }
    } else if (is_archive()) {
      cakeTitle = `${__('title.archive')} | ${title}`;
    } else if (is_category()) {
      cakeTitle = `${__('title.category')}:${page.category} | ${title}`;
    } else if (is_tag()) {
      cakeTitle = `${__('title.tag')}:${page.tag} | ${title}`;
    }
    return `<title>${cakeTitle}</title>`;
  });
};
