/* global hexo */

'use strict';

const path = require('path');

hexo.extend.filter.register('theme_inject', injector => {
  injector.get('comment').forEach(element => {
    // Set default button content
    let injectName = path.basename(element.name, path.extname(element.name));
    element.locals = Object.assign({
      configKey: injectName,
      class    : injectName,
      button   : injectName
    }, element.locals);
    // Get locals and config
    let locals = element.locals;
    let config = hexo.theme.config.comments;
    // Set activeClass
    if (config.active === locals.configKey) {
      config.activeClass = locals.class;
    }
    // Set custom button content
    if (config.nav) {
      let nav = config.nav[locals.configKey] || {};
      if (nav.order) {
        element.priority = nav.order;
      }
      if (nav.text) {
        locals.button = nav.text;
      }
    }
  });
}, 99999);
