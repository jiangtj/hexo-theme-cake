"use strict";

module.exports = (hexo) => {
  hexo.extend.helper.register("cake_image", function (url, options, extra) {
    url = this.url_for(url);
    let src = `src="${url}"`;

    const innerOptions = Object.assign(
      {
        zoomable: hexo.config.medium_zoom.enable,
      },
      options,
    );

    let zoomable = "";
    if (innerOptions.zoomable) {
      zoomable = 'data-zoomable="true"';
    }

    return `<img ${src} ${zoomable} ${extra}/>`;
  });
};
