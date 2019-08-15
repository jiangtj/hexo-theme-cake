'use strict';

const { merge } = require("lodash");

module.exports = function(hexo) {

  let data = hexo.locals.get('data');

  // Read config from data.next or theme_config
  if (data && data.next) {
    merge(hexo.theme.config, data.next);
  } else {
    merge(hexo.theme.config, hexo.config.theme_config);
  }

  // Custom languages support.
  if (data && data.languages) {
    var lang = hexo.config.language;
    var i18n = hexo.theme.i18n;
    var mergeLang = function (lang) {
      i18n.set(lang, merge(i18n.get([lang]), data.languages[lang]));
    };
    if (Array.isArray(lang)) {
      for (var i = 0; i < lang.length; i++) {
        mergeLang(lang[i]);
      }
    } else {
      mergeLang(lang);
    }
  }

  // Only Gemini.
  hexo.theme.config.scheme = 'Gemini';

};
