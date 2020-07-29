'use strict';

const { readFileSync } = require('fs');

module.exports = hexo => options => {
  const injector = require('hexo-extend-injector2')(hexo);
  if (options.light) {
    injector.register('style', readFileSync(options.light, 'utf-8'));
  }
  if (options.dark) {
    injector.register('style', `@media (prefers-color-scheme: dark) { ${readFileSync(options.dark, 'utf-8')} }`);
  }
};
