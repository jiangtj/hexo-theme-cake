'use strict';

const { icon: iconFn } = require('@jiangtj/hexo-icon-svg-core/lib/core');

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  hexo.extend.filter.register('before_generate', () => {
    const menu = hexo.theme.config.menu;
    Object.keys(menu).forEach(name => {
      const options = menu[name];
      if (options.enable === false) {
        return;
      }
      injector.register('menu', {
        value: ctx => {
          const {__, titlecase, url_for} = ctx;
          let text = __('menu.' + name);
          if (text.indexOf('menu.') === 0) {
            text = titlecase(text.replace('menu.', ''));
          }
          let icon = '';
          if (options.icon) {
            icon = iconFn(options.icon.name, options.icon.options);
          }
          return [
            `<li class="menu-item menu-item-${name}">`,
            `<a href="${url_for(options.path)}">${icon + text}</a>`,
            '</li>'
          ].join('');
        },
        priority: options.priority || 10,
        isRun: true
      });
    });
  });
};
