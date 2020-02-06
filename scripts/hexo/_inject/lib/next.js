/**
 * Compatible with next theme injector
 */

const points = require('./next-point');
const fs = require('fs');
const path = require('path');
const defaultExtname = '.swig';

// Defining stylus types
class StylusInject {
  constructor(base_dir) {
    this.base_dir = base_dir;
    this.files = [];
  }
  push(file) {
    // Get absolute path base on hexo dir
    this.files.push(path.resolve(this.base_dir, file));
  }
}

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
  let injects = {};
  points.styles.forEach(item => {
    injects[item] = new StylusInject(base_dir);
  });
  points.views.forEach(item => {
    injects[item] = new ViewInject(base_dir);
  });
  return injects;
}


module.exports = (ctx, injector) => {

  ctx.on('generateBefore', () => {
    let injects = initInject(ctx.base_dir);
    ctx.execFilterSync('theme_inject', injects);
    // stylus
    points.styles.forEach(type => {
      injects[type].files.forEach(file => injector.register(type, file, () => true, 10, true));
    });
    // view
    points.views.forEach(type => {
      injects[type].raws
        .map((injectObj, index) => {
          let name = injectObj.name;
          let layout = `inject/${type}/${name}`;
          if (!ctx.theme.getView(layout)) {
            ctx.theme.setView(layout, injectObj.raw);
          }
          let locals = injectObj.args[0];
          let options = injectObj.args[1];
          let order = injectObj.args[2] || index;
          let value = ctx => ctx.partial(layout, locals, options);
          return { value, priority: order, name, layout, locals, options, isRun: true };
        })
        .sort((a, b) => b.priority - a.priority)
        .forEach(data => injector.register(type, data));
    });
  });
}
