# Hexo Theme Cake

:cake: It's a lovely theme, based on [NexT:7.1.0](https://github.com/theme-next/hexo-theme-next), and some styles come from [inside](https://github.com/ikeq/hexo-theme-inside).

![GitHub release](https://img.shields.io/github/release/jiangtj/hexo-theme-cake.svg)
![Size](https://badgen.net/packagephobia/publish/hexo-theme-cake)

## Preview & Docs

![image](https://user-images.githubusercontent.com/15902347/61528469-74ca5200-aa51-11e9-8248-061679a4ac73.png)

- https://www.dnocm.com/cake/
- https://cake.jiangtj.com/

## Plugins
- [hexo-cake-canvas-ribbon](https://github.com/jiangtj-lab/hexo-cake-canvas-ribbon): Ribbon background
- [hexo-cake-math](https://github.com/jiangtj-lab/hexo-cake-math): Math Support
- [hexo-cake-moon-menu](https://github.com/jiangtj-lab/hexo-cake-moon-menu): A new style for back2top button and scrollpercent.
- [hexo-cake-local-search](https://github.com/jiangtj-lab/hexo-cake-local-search): Local search function

*More in [Dnocm Plugins Site](https://www.dnocm.com/cake/plugins) or [Awesome NexT](https://github.com/theme-next/awesome-next) (if has trouble in use NexT Plugins, may need to install [njk render](https://github.com/theme-next/hexo-renderer-njks))*

## Quick Start

### Require

Require some renderer feature to support, [hexo-renderer-stylus:45](https://github.com/hexojs/hexo-renderer-stylus/pull/45) and [hexo-renderer-marked:129](https://github.com/hexojs/hexo-renderer-marked/pull/129), if they don't release a new version, you need to install the following

```bash
yarn add jiangtj-lab/hexo-renderer-stylus#fiter
yarn add hexojs/hexo-renderer-marked
```

### Install & Run

```bash
# Create a new hexo project
hexo init <dir>
cd <dir>
# Install hexo-theme-cake
yarn add hexo-theme-cake
```

Modify `theme` to `cake`.

Run `hexo s`, and preview.

## Browser Support
Modern Browser (No IE)
