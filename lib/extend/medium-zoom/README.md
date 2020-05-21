# medium-zoom

Zooming images

## config

```yml
medium_zoom:
  enable: true
  selector: .post-body img:not([data-zoomable="false"]), [data-zoomable]:not([data-zoomable="false"])
  load: bundler # set bundler or cdn, if cdn is setted, please set a href for medium_zoom.cdn
  #cdn: https://cdn.jsdelivr.net/npm/medium-zoom@1/dist/medium-zoom.min.js
