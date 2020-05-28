# lozad

lazyload your picture

*`loading='lazy'` attribute isn't supported in Safari, and it will be removed when Safari support*

## config

```yml
lozad:
  enable: true
  faster: true # if true, use String.replace, else use chreeio.load
  load: bundler # set bundler or cdn, if cdn is setted, please set a href for lozad.cdn
  #cdn: https://cdn.jsdelivr.net/npm/lozad@1/dist/lozad.min.js
```
