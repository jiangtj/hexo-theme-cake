/**
 * button.js | https://theme-next.org/docs/tag-plugins/button/
 */

/* global hexo */

'use strict';

const fs = require('fs');
const util = require('hexo-util');
const yaml = require('js-yaml');

function renderShields(data) {

  let htmlTag = util.htmlTag;
  let config = yaml.safeLoad(data);

  let items = Object.keys(config).map((key) => {
    let value = config[key];
    let aArgs = {
      class: 'un-decoration',
      href: value.href,
      target: value.href||'_blank'
    }
    value.src = value.src || 'https://img.shields.io/badge/'+ encodeURI(value.name||key) + '-' + encodeURI(value.des) + '-' + encodeURI(value.color) + '.svg'
    let imgArgs = {
      src: value.src,
      alt: value.alt||key,
      title: value.title
    }
    //<img style="margin:0;float:left;" src="https://img.shields.io/badge/Mail-@dnocm-blue.svg" alt="Mail">
    return htmlTag('a',aArgs,
      htmlTag('img',imgArgs)
    );
  });
  return items.join('');
}

hexo.extend.tag.register('shields_data', (args,content) => {
  return renderShields(content);
}, { ends: true });

hexo.extend.tag.register('shields', (args) => {
  let filePath = args[0];
  if (!filePath) {
    hexo.log.warn('FilePath can NOT be empty');
  }
  if (!filePath.indexOf('/') == 0) {
    filePath = 'source/_data/' + filePath;
  }
  filePath = filePath + '.yml';
  if (filePath.indexOf('.') < 0) {
  }
  let data = fs.readFileSync(filePath);
  return renderShields(data);
}, { ends: false });
