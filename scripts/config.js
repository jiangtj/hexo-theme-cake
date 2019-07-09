/* global hexo */

'use strict';

hexo.on('generateBefore', function () {

  let data = hexo.locals.get('data');

  // Read config from data.next or theme_config
  if (data && data.next) {
    Object.assign(hexo.theme.config, data.next);
  } else {
    Object.assign(hexo.theme.config, hexo.config.theme_config);
  }

  // Custom languages support.
  if (data && data.languages) {
    var lang = this.config.language;
    var i18n = this.theme.i18n;
    var mergeLang = function (lang) {
      i18n.set(lang, Object.assign(i18n.get([lang]), data.languages[lang]));
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

  // Add filter type `theme_inject`.
  require('./injects')(hexo);

  // Only Gemini.
  let visibleTags = 0;
  hexo.locals.get('tags').forEach((tag) => {
    if (tag.length) {
      visibleTags += 1;
    }
  })
  hexo.theme.config.visibleTags = visibleTags;

  
  let visibleCategories = 0;
  hexo.locals.get('categories').forEach((categorie) => {
    if (categorie.length) {
      visibleCategories += 1;
    }
  })
  hexo.theme.config.visibleCategories = visibleCategories;

});