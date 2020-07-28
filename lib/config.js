'use strict';

module.exports = hexo => {

  const { join } = require('path');
  const { readJsonFile } = require('./utils');
  const { mergeWith } = require('lodash');

  hexo.extend.filter.register('before_generate', () => {
    const customizer = (objValue, srcValue) => {
      if (srcValue === null || srcValue === undefined) {
        return objValue;
      }
      if (Array.isArray(objValue)) {
        return srcValue;
      }
    };
    hexo.theme.config = mergeWith({
      author: {
        name: hexo.config.author
      },
      head: {
        favicons: []
      }
    }, hexo.theme.config, customizer);
  }, -Number.MAX_VALUE);

  hexo.extend.filter.register('template_locals', locals => {
    const { config } = hexo;
    const { theme } = locals;
    locals.author = theme.author;
    locals.hexo_pkg = readJsonFile(join(hexo.base_dir, 'package.json'));
    locals.theme_pkg = readJsonFile(join(hexo.theme_dir, 'package.json'));
    // Disable language for site.
    locals.title = config.title;
    locals.subtitle = config.subtitle;
    locals.description = config.description;
  });

};
