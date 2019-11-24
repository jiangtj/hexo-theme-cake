/* global hexo */

'use strict';

const {slugize, stripHTML} = require('hexo-util');
const {filter} = hexo.extend;

function anchorId(str, transformOption) {
  return slugize(str.trim(), {transform: transformOption});
}

filter.register('marked:heading', (data, options) => {
  let { text, level } = data;
  if (!options.headerIds) {
    return `<h${level}>${text}</h${level}>`;
  }
  const transformOption = options.modifyAnchors;
  let id = anchorId(stripHTML(text), transformOption);
  const headingId = options._headingId;

  // Add a number after id if repeated
  if (headingId[id]) {
    id += `-${headingId[id]++}`;
  } else {
    headingId[id] = 1;
  }
  // add headerlink
  data.content = `<h${level} id="${id}"><a href="#${id}" class="headerlink" title="${stripHTML(text)}"></a>${text}</h${level}>`;
});
