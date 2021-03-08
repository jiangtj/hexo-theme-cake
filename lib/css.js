'use strict';

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');
  injector.register('variable', { path: join(hexo.theme_dir, 'source/css/_variables/index.styl'), priority: 9 });
  injector.register('variable', { path: join(hexo.theme_dir, 'source/css/color/index.styl'), priority: 100 });
  injector.register('style', { path: join(hexo.theme_dir, 'source/css/_styles/index.styl'), priority: 9 });

  const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  const links = {
    auto: url_for('/css/color/index.css'),
    light: url_for('/css/color/light.css'),
    dark: url_for('/css/color/dark.css')
  };
  // preload
  Object.keys(links).forEach(key => {
    injector.register('head-end', `<link rel="preload" as="style" href="${links[key]}"></link>`);
  });

  injector.register('js', {text: `CONFIG.colorLinks = ${JSON.stringify(links)}`, priority: 2});
  injector.register('js', {path: join(__dirname, 'js/switch-color.js'), priority: 3});

  if (hexo.config.moon_menu) {
    hexo.config.moon_menu.switch_color = Object.assign({
      icon: 'fas fa-moon'
    }, hexo.config.moon_menu.switch_color);
  }
};
