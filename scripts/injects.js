'use strict';

const fs = require('fs');
const path = require('path');

const stylusInjectTypes = ['variable', 'style'];
class StylusInject {
  constructor() {
    this.files = [];
  }
  push(file) {
    this.files.push(file);
  }
}

const viewInjectTypes = ['head', 'header', 'bodyEnd', 'sidebar', 'reward'];
class ViewInject {
  constructor() {
    this.raws = [];
  }
  raw(name, raw, ...args) {
    this.raws.push({
      name,
      raw,
      args
    });
  }
  file(name, file, ...args) {
    this.raw.apply(this, [name, fs.readFileSync(file).toString()].concat(args));
  }
}

// init injects var
function initInject () {
  let injects = {};
  stylusInjectTypes.forEach((item) => {
    injects[item] = new StylusInject();
  });
  viewInjectTypes.forEach((item) => {
    injects[item] = new ViewInject();
  });
  return injects;
}

module.exports =  function(hexo) {
  // exec theme_inject filter
  let injects = initInject();
  hexo.execFilterSync('theme_inject', injects);
  hexo.theme.config.injects = {};

  //inject stylus
  stylusInjectTypes.forEach((type) => {
    hexo.theme.config.injects[type] = injects[type].files.map((item) => path.relative(hexo.base_dir,item));
  });

  // inject views
  viewInjectTypes.forEach((type) => {
    hexo.theme.config.injects[type] = {};
    injects[type].raws.forEach((injectObj) => {
      let viewName = `inject/${type}/${injectObj.name}.swig`;
      hexo.theme.setView(viewName, injectObj.raw);
      hexo.theme.config.injects[type][injectObj.name] = {
        layout: viewName,
        locals: injectObj.args[0],
        options: injectObj.args[1]
      };
    });
  });
};


