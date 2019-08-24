'use strict';

const { merge } = require('lodash');

module.exports = function(hexo) {

  let data = hexo.locals.get('data') || {};

  // Read config from data.next or theme_config
  merge(hexo.theme.config, hexo.config.theme_config, data.next);

  // Custom languages support.
  if (data.languages) {
    let lang = hexo.config.language;
    let i18n = hexo.theme.i18n;
    let mergeLang = function(lang) {
      i18n.set(lang, merge(i18n.get([lang]), data.languages[lang]));
    };
    if (Array.isArray(lang)) {
      lang.forEach(item => mergeLang(item));
    } else {
      mergeLang(lang);
    }
  }

  // Only Gemini.
  hexo.theme.config.scheme = 'Gemini';

};
