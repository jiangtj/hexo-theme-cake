"use strict";

module.exports = (hexo) => {
  return Promise.all([
    // todo fix lozad
    // require('./lozad')(hexo),
    require("./medium-zoom")(hexo),
    require("./reward")(hexo),
    require("./external-link")(hexo),
    require("./comment")(hexo),
    require("./font-size-preview")(hexo),
  ]);
};
