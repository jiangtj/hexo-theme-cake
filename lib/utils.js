'use strict';

const { mergeWith } = require('lodash');
const { join } = require('path');

module.exports = {
  htmlTag: function(tag, attrs, text) {
    let attrText = '';
    if (attrs) {
      attrText = ' ' + Object.keys(attrs).map(key => `${key}="${attrs[key]}"`).join(' ');
    }
    let end = '/>';
    if (text) {
      end = `>${text}</${tag}>`;
    }
    return `<${tag}${attrText} ${end}`;
  },
  copy: (object, sources) => {
    return mergeWith(object, sources, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return srcValue;
      }
    });
  },
  deps    : null,
  loadUtil: hexo => {
    const packagePath = join(hexo.base_dir, 'package.json');
    if (!this.deps) this.deps = require(packagePath).dependencies;
    return name => {
      if (!this.deps[name]) {
        hexo.loadPlugin(hexo.resolvePlugin(name));
      }
    };
  }
};
