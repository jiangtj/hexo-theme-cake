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
        let view = `inject/${item}/${name}`;
        hexo.theme.setView(view, raw);
        let locals = args[0];
        let options = args[1] || {};
        let priority = args[2];
        injector.register(item, {
          value: (ctx) => ctx.partial(view, locals, options),
          priority
        });
        //this.raws.push({name, raw, args});
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
    hexo.theme.config.injects[type] = injector.get(type).map(item => item.value);
  });

  // set injector
  hexo.theme.config.injector = injector;

  // Inject views
  // points.views.forEach(type => {
  //   let configs = Object.create(null);
  //   hexo.theme.config.injects[type] = [];
  //   // Add or override view.
  //   injector[type].raws.forEach((injectObj, index) => {
  //     let name = `inject/${type}/${injectObj.name}`;
  //     hexo.theme.setView(name, injectObj.raw);
  //     configs[name] = {
  //       layout : name,
  //       locals : injectObj.args[0],
  //       options: injectObj.args[1],
  //       order  : injectObj.args[2] || index
  //     };
  //   });
  //   // Views sort.
  //   hexo.theme.config.injects[type] = Object.values(configs)
  //     .sort((x, y) => x.order - y.order);
  // });
};
