'use strict';

const { mergeWith } = require('lodash');
const { join } = require('path');
const { readFileSync } = require('fs');
const { Cache } = require('hexo-util');
const cache = new Cache();

const utils = {
  htmlTag: (tag, attrs, text) => {
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
  readJsonFile: path => {
    return cache.apply(path, () => {
      const data = readFileSync(path, 'utf-8');
      return JSON.parse(data);
    });
  },
  loadUtil: hexo => {
    const deps = utils.readJsonFile(join(hexo.base_dir, 'package.json')).dependencies;
    return name => {
      if (!deps[name]) {
        return hexo.loadPlugin(hexo.resolvePlugin(name));
      }
    };
  }
};

module.exports = utils;
