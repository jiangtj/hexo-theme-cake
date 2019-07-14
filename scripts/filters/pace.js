hexo.extend.filter.register('theme_inject', function(injects) {
  let pace = hexo.theme.config.pace;
  if (!pace.enable) return;
  injects.head.raw('pace', `
  <script src="${pace.cdn}"></script>
  <link rel="stylesheet" href="${pace.theme}"/>
  `, {}, {only: true, cache: true})
});