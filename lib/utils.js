'use strict';

const { mergeWith } = require('lodash');
const { join } = require('path');
const { readFileSync } = require('fs');
const { Cache } = require('hexo-util');
const { faInline } = require('./fontawesome/fa');
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
  deps: dir => utils.readJsonFile(join(dir, 'package.json')).dependencies,
  loadUtil: hexo => {
    const deps = utils.deps(hexo.base_dir);
    return name => {
      if (!deps[name]) {
        return hexo.loadPlugin(hexo.resolvePlugin(name));
      }
    };
  },
  isHexoRendererMarkedMini: hexo => {
    const deps = utils.deps(hexo.base_dir);
    return deps['hexo-renderer-marked-mini'];
  },
  iconRender: params => {
    const data = params.split(' ');
    return faInline(data[1].substring(3), {prefix: data[0]});
  }
};

module.exports = utils;
