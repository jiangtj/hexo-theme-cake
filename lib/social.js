'use strict';

const { copy } = require('./utils');

module.exports = hexo => {
  hexo.extend.filter.register('before_generate', () => {
    let config = copy(hexo.theme.config.social, hexo.config.social);
    if (!config.enable || !config.items) return;

    const injector = require('hexo-extend-injector2')(hexo);
    const fa = hexo.extend.helper.get('fa_inline').bind(hexo);

    let links = config.items.map(element => {
      let content = '';
      if (element.icon) {
        content += fa(element.icon.name, element.icon.options);
      }
      if (element.name) {
        content += element.name;
      }
      return `<a href="${element.link}" title="${element.link}" rel="noopener" target="_blank">${content}</a>`;
    });

    let value = `<div class="social-links">${links.join('')}</div>`;
    injector.register('sidebar', {value, isRun: true});
  });
};
