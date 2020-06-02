'use strict';

module.exports = hexo => {
  hexo.extend.filter.register('before_generate', () => {
    let sns = hexo.theme.config.author.sns;
    if (!sns || sns.length === 0) return;

    const injector = require('hexo-extend-injector2')(hexo);
    const fa = hexo.extend.helper.get('fa_inline').bind(hexo);

    let links = sns.map(element => {
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
