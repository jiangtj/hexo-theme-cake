'use strict';

const fs = require('fs');
const path = require('path');
const points = require('./injects-point');
const Injector = require('./injector');
const defaultExtname = '.swig';

// Defining view types
class ViewInject {
  constructor(base_dir) {
    this.base_dir = base_dir;
    this.raws = [];
  }
  raw(name, raw, ...args) {
    // Set default extname
    if (path.extname(name) === '') {
      name += defaultExtname;
    }
    this.raws.push({name, raw, args});
  }
  file(name, file, ...args) {
    // Set default extname from file's extname
    if (path.extname(name) === '') {
      name += path.extname(file);
    }
    // Get absolute path base on hexo dir
    this.raw(name, fs.readFileSync(path.resolve(this.base_dir, file), 'utf8'), ...args);
  }
}

// Init injects
function initInject(base_dir) {
  let injector = new Injector();
  points.styles.forEach(item => {
    injector[item] = {
      push: (file) => {
        injector.register(item, path.resolve(base_dir, file));
      }
    };
  });
  points.views.forEach(item => {
    injector[item] = new ViewInject(base_dir);
  });
  return injector;
}

module.exports = hexo => {
  // Exec theme_inject filter
  let injector = initInject(hexo.base_dir);
  hexo.execFilterSync('theme_inject', injector);
  hexo.theme.config.injects = {};

  // Inject stylus
  points.styles.forEach(type => {
    hexo.theme.config.injects[type] = injector.get(type).map(item => item.value);
  });

  // Inject views
  points.views.forEach(type => {
    let configs = Object.create(null);
    hexo.theme.config.injects[type] = [];
    // Add or override view.
    injector[type].raws.forEach((injectObj, index) => {
      let name = `inject/${type}/${injectObj.name}`;
      hexo.theme.setView(name, injectObj.raw);
      configs[name] = {
        layout : name,
        locals : injectObj.args[0],
        options: injectObj.args[1],
        order  : injectObj.args[2] || index
      };
    });
    // Views sort.
    hexo.theme.config.injects[type] = Object.values(configs)
      .sort((x, y) => x.order - y.order);
  });
};
