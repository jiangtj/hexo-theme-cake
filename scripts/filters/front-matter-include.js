/* global hexo */

'use strict';

hexo.extend.filter.register('template_locals', (locals) => {
  const { page, theme } = locals;
  let key = page.include;
  if (!key) return;

  let data = hexo.locals.get('data');
  if (!Array.isArray(key)) {
    key = [key];
  }

  key.forEach(item => Object.assign(page, theme[item], hexo.config[item], data[item]));

});
