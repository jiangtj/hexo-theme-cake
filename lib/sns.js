'use strict';

const { icon } = require('@jiangtj/hexo-icon-svg-core/lib/core');

module.exports = hexo => {
  hexo.extend.filter.register('before_generate', () => {
    const sns = hexo.theme.config.author.sns;
    if (!sns || sns.length === 0) return;

    const injector = require('hexo-extend-injector2')(hexo);

    const links = sns.map(element => {
      let content = '';
      if (element.icon) {
        content += icon(element.icon.name, element.icon.options);
      }
      if (element.name) {
        content += element.name;
      }
      return `<a href="${element.link}" title="${element.link}" rel="noopener" target="_blank">${content}</a>`;
    });

    const value = `<div class="social-links">${links.join('')}</div>`;
    injector.register('sidebar', {value, isRun: true});
  });
};
