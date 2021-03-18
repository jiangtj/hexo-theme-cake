'use strict';

module.exports = hexo => {
  const injector = require('hexo-extend-injector2')(hexo);
  const { join } = require('path');
  const url_for = hexo.extend.helper.get('url_for').bind(hexo);

  const config = injector.config.css;
  config.path.auto = Object.assign({
    link: 'preload',
    path: 'css/injector/auto.css'
  }, config.path.auto);

  injector.register('variable', { path: join(hexo.theme_dir, 'source/css/_variables/index.styl'), priority: 9 });
  injector.register('variable', { path: join(hexo.theme_dir, 'source/css/color/index.styl'), priority: 100 });
  injector.register('style', { path: join(hexo.theme_dir, 'source/css/_styles/index.styl'), priority: 9 });

  injector.register('variable', { path: join(hexo.theme_dir, 'source/css/color/dark.styl'), env: 'dark' });
  injector.register('variable', { path: join(hexo.theme_dir, 'source/css/color/light.styl'), env: 'light' });

  injector.register('variable', {
    env: 'auto',
    value: () => {
      const light = Promise.all(injector.get('css', {env: 'light'}).toPromise()).then(vals => vals.join('\n'));
      const dark = Promise.all(injector.get('css', {env: 'dark'}).toPromise()).then(vals => vals.join('\n'));
      return Promise.all([light, dark]).then(([light, dark]) => {
        return `${light}@media (prefers-color-scheme: dark) {${dark}}`;
      });
    }
  });

  injector.register('js', {
    value: () => {
      const links = {};
      Object.keys(config.path).forEach(key => {
        links[key] = {
          path: url_for(config.path[key].path)
        };
      });
      const fa = hexo.extend.helper.get('fa_inline');
      links.auto.icon = fa('adjust');
      links.dark.icon = fa('moon');
      links.light.icon = fa('sun');
      return `CONFIG.colorLinks = ${JSON.stringify(links)}`;
    },
    priority: 2
  });
  injector.register('js', {path: join(__dirname, 'js/switch-color.js'), priority: 3});

  if (hexo.config.moon_menu) {
    hexo.config.moon_menu.switch_color = Object.assign({
      icon: 'fas fa-adjust'
    }, hexo.config.moon_menu.switch_color);
  }
};
