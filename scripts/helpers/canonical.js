/* global hexo */

hexo.extend.helper.register('canonical', function() {
  const { permalink } = hexo.config;
  const { canonical } = hexo.theme.config;
  if (!canonical) return '';
  var url = this.url.replace(/index\.html$/, '');
  if (!permalink.endsWith('.html')) {
    url = url.replace(/\.html$/, '');
  }
  return `<link rel="canonical" href="${url}">`;
});
