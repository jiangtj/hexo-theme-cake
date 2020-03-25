'use strict';

module.exports = hexo => {

  const {iconText} = require('./common');
  const injector = require('hexo-extend-injector2')(hexo);

  hexo.extend.filter.register('before_generate', () => {
    let theme = hexo.theme.config;
    if (!theme.disqus.enable || !theme.disqus.shortname) return;

    injector.register('comment', {
      name : 'disqus',
      value: [
        '<div class="comments">',
        '<div id="disqus_thread">',
        '<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>',
        '</div>',
        '</div>'
      ].join(''),
      isRun: true
    });

    injector.register('bodyEnd', {
      value: ({page}) => `
<script>
  var disqus_config = function () {
    this.page.url = '${page.permalink}';
    this.page.identifier = '${page.path}';
  };
  NexT.utils.loadComments(document.querySelector('#disqus_thread'), () => {
    var d = document, s = d.createElement('script');
    s.src = 'https://${theme.disqus.shortname}.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  });
</script>
      `,
      predicate: ctx => ctx.page.comments,
      priority : 20,
      isRun    : true
    });

    if (theme.disqus.count) {
      const fa = hexo.extend.helper.get('fa_inline');
      injector.register('postMeta', {
        value: ctx => {
          const {post} = ctx;
          const url_for = hexo.extend.helper.get('url_for').bind(ctx);
          return `
<span class="post-meta-item">
  ${iconText(fa('comment-alt', {prefix: 'far'}), 'disqus')}
  <a title="disqus" href="${url_for(post.path)}#comments" itemprop="discussionUrl">
    <span class="post-comments-count disqus-comment-count" data-disqus-identifier="${post.path}" itemprop="commentCount"></span>
  </a>
</span>
          `;
        },
        predicate: ctx => ctx.page.comments,
        isRun    : true
      });
      injector.register('bodyEnd', {
        value: `<script id="dsq-count-scr" src="//${theme.disqus.shortname}.disqus.com/count.js" async></script>`,
        isRun: true
      });
    }

  });

};
