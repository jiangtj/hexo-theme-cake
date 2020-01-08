'use strict';

const fs = require('fs');
const path = require('path');
const points = require('./injects-point');
const Injector = require('./injector');
const defaultExtname = '.swig';

// Init injects
function initInject(hexo) {
  let injector = new Injector();
  points.styles.forEach(item => {
    injector[item] = {
      push: (file) => {
        injector.register(item, path.resolve(hexo.base_dir, file));
      }
    };
  });
  points.views.forEach(item => {
    injector[item] = {
      raw: (name, raw, ...args) => {
        // Set default extname
        if (path.extname(name) === '') {
          name += defaultExtname;
        }
        let layout = `inject/${item}/${name}`;
        hexo.theme.setView(layout, raw);
        let locals = args[0];
        let options = args[1] || {};
        let priority = args[2];
        let value = ctx => ctx.partial(layout, locals, options);
        injector.register(item, { value, priority, name, layout, locals, options });
      },
      file: (name, file, ...args) => {
        // Set default extname from file's extname
        if (path.extname(name) === '') {
          name += path.extname(file);
        }
        // Get absolute path base on hexo dir
        injector[item].raw(name, fs.readFileSync(path.resolve(hexo.base_dir, file), 'utf8'), ...args);
      }
    };
  });
  return injector;
}

module.exports = hexo => {
  // Exec theme_inject filter
  let injector = initInject(hexo);
  hexo.execFilterSync('theme_inject', injector);
  hexo.theme.config.injects = {};

  // Inject stylus
  points.styles.forEach(type => {
    hexo.theme.config.injects[type] = injector.get(type).list().map(item => item.value);
  });

  // Set injector
  hexo.theme.injector = injector;
};
