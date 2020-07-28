'use strict';

module.exports = hexo => {

  const { join } = require('path');
  const injector = require('hexo-extend-injector2')(hexo);

  const utteranc = {
    name: 'utteranc',
    options: {},
    value: () => {
      const config = Object.assign({
        src: 'https://utteranc.es/client.js',
        repo: '',
        issue_term: 'pathname',
        label: '',
        theme: 'github-light'
      }, utteranc.options);
      if (config.label !== '') config.label = ` label="${config.label}"`;
      return `<script src="${config.src}" repo="${config.repo}" issue-term="${config.issue_term}"${config.label} theme="${config.theme}" crossorigin="anonymous" async></script>`;
    },
    style: join(__dirname, 'style.styl')
  };

  injector.register('comment', utteranc);
};
