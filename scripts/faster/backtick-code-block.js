/* global hexo */

const {filter} = hexo.extend;

const beforePostRenders = filter.list().before_post_render;
for (let fn of beforePostRenders) {
  if (fn.name === 'backtickCodeBlock') {
    filter.unregister('before_post_render', fn);
  }
}

// filter.register('marked:code', (data, options) => {
//   // data.content = highlight(stripIndent(data.code), {
//   //   lang      : data.infostring,
//   //   gutter    : true,
//   //   wrap      : true,
//   //   tab       : null,
//   //   autoDetect: false
//   // });
//   // data.content = `<escape>${data.content}</escape>`;
//   // data.content = `<pre><code>${data.content}</code></pre>`;
//   // data.content = data.code;
//   if (data.escaped !== false) {
//     data.code = escapeHTML(data.code);
//   }
//   data.content =  `<pre class="prettyprint linenums"><code class="language-${data.infostring}">${data.code}</code></pre>`;
// }, 20);

hexo.extend.filter.register('theme_inject', function(injects) {
  injects.bodyEnd.raw('code-prettify', `
  <script>
    document.querySelectorAll('pre').forEach(element => {
      element.classList.add('prettyprint');
      element.classList.add('linenums');
    });
  </script>
  <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
  `, {}, {only: true});
});
