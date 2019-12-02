/* global hexo */

'use strict';

hexo.extend.helper.register('next_title', function() {
  let {__, is_home, is_post, is_page, is_archive, is_category, is_tag} = this;
  let {theme, page, subtitle, title} = this;
  let nextTitle = '';
  if (is_home()) {
    nextTitle = title;
    if (theme.index_with_subtitle && subtitle) {
      nextTitle += ` - ${subtitle}`;
    }
  } else if (is_post()) {
    nextTitle = `${page.title} | ${title}`;
  } else if (is_page()) {
    let page_title_suffix = ' | ' + title;
    if (page.type === 'categories' && !page.title) {
      nextTitle = __('title.category') + page_title_suffix;
    } else if (page.type === 'tags' && !page.title) {
      nextTitle = __('title.tag') + page_title_suffix;
    } else {
      nextTitle = page.title + page_title_suffix;
    }
  } else if (is_archive()) {
    nextTitle = `${__('title.archive')} | ${title}`;
  } else if (is_category()) {
    nextTitle = `${__('title.category')}:${page.category} | ${title}`;
  } else if (is_tag()) {
    nextTitle = `${__('title.tag')}:${page.tag} | ${title}`;
  }
  return `<title>${nextTitle}</title>`;
});
