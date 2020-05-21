'use strict';

module.exports = hexo => {

  hexo.extend.helper.register('cake_image', function(url, options, extra) {
    url = this.url_for(url);
    let src = `src="${url}"`;

    let innerOptions = Object.assign({
      zoomable: hexo.config.medium_zoom.enable,
      lozad   : hexo.config.lozad.enable
    }, options);

    let zoomable = '';
    if (innerOptions.zoomable) {
      zoomable = 'data-zoomable="true"';
    }

    if (innerOptions.lozad) {
      src = `data-src="${url}"`;
    }

    return `<img ${src} ${zoomable} ${extra}/>`;
  });

};
