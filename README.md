# Hexo Theme Cake

:cake: It's a lovely theme, based on [NexT:7.1.0](https://github.com/theme-next/hexo-theme-next). You can find docs in [my blog](https://www.dnocm.com/cake/).

<img src="https://img.shields.io/badge/hexo-%3E%3D%203.5.0-blue.svg">

## Feature

Inject
```js
hexo.extend.filter.register('theme_inject', function(injects) {
  injects.head.file('custom', 'source/_data/head.swig', {}, {cache: true});
  injects.sidebar.raw('custom', 'Put some in sidebar!');
});
```


## Issues
- [ ] Categories/Tags count contains _drafts.
