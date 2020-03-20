'use strict';

const { mergeWith } = require('lodash');

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
  }
};
