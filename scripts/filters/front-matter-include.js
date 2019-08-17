/* global hexo */

'use strict';

hexo.extend.filter.register('template_locals', (locals) => {
  const { page, theme } = locals;
  let key = page.include;
  if (key) {
    let data = hexo.locals.get('data');
    Object.assign(page, theme[key], hexo.config[key], data[key]);
  }
});
