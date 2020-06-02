'use strict';

module.exports = hexo => {

  const { iconText } = require('../common');
  const injector = require('hexo-extend-injector2')(hexo);

  const disqus = {
    name   : 'disqus',
    options: {},
    value  : ({page}) => `
<div id="disqus_thread"></div>
<script>
var disqus_config = function () {
this.page.url = '${page.permalink}';;  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = '${page.path}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://${disqus.options.shortname}.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    `,
    meta: {
      enable: false,
      value : ({page, fa_inline, url_for}) => `
<span class="post-meta-item">
  ${iconText(fa_inline('comment-alt', {prefix: 'far'}), 'disqus')}
  <a title="disqus" href="${url_for(page.path)}#disqus_thread">loading</a>
</span>
      `,
      script: () => `<script id="dsq-count-scr" src="//${disqus.options.shortname}.disqus.com/count.js" async></script>`
    }
  };

  injector.register('comment', disqus);
};
