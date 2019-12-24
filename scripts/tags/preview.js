/* global hexo */

/**
 * {% preview %}
 * <template>
 *   html code
 * </template>
 * <style>
 *   css code
 * </style>
 * <script>
 *   js code
 * </script>
 * {% endpreview %}
 */

'use strict';

function getContent(content, tag) {
  let index = content.indexOf(`<${tag}>`);
  if (index === -1) {
    return '';
  }
  let endIndex = content.indexOf(`</${tag}>`);
  return content.substring(index + tag.length + 2, endIndex);
}

function preview(args, content) {
  let js = getContent(content, 'script');
  let css = getContent(content, 'style');
  let html = getContent(content, 'template');

  // let out = '';
  // if (html) {
  //   out += '<header style="margin-bottom: -20px">html</header>' + hexo.render.renderSync({text: `\`\`\`html${html}\`\`\``, engine: 'markdown'});
  // }
  // if (js) {
  //   out += '<header style="margin-bottom: -20px">js</header>' + hexo.render.renderSync({text: `\`\`\`js${js}\`\`\``, engine: 'markdown'});
  // }
  // if (css) {
  //   out += '<header style="margin-bottom: -20px">css</header>' + hexo.render.renderSync({text: `\`\`\`css${css}\`\`\``, engine: 'markdown'});
  // }
  // return `${out}<style>${css}</style><header style="margin-bottom: -20px">result</header><div class="template">${html}</div><script>${js}</script>`;
  // return hexo.render.render({text: `\`\`\`html${html}\`\`\``, engine: 'markdown'}).then(result => {
  //   out += '<header style="margin-bottom: -20px">html</header>' + result;
  //   return hexo.render.render({text: `\`\`\`js${js}\`\`\``, engine: 'markdown'});
  // }).then(result => {
  //   out += '<header style="margin-bottom: -20px">js</header>' + result;
  //   return hexo.render.render({text: `\`\`\`css${css}\`\`\``, engine: 'markdown'});
  // }).then(result => {
  //   out += '<header style="margin-bottom: -20px">css</header>' + result;
  //   return `${out}<style>${css}</style><header style="margin-bottom: -20px">result</header><div class="template">${html}</div><script>${js}</script>`;
  // });
  return Promise.all([
    Promise.resolve(html)
      .then(html => {
        if (html) return hexo.render.render({text: `\`\`\`html${html}\`\`\``, engine: 'markdown'});
      })
      .then(result => {
        if (result) return Promise.resolve('<header style="margin-bottom: -20px">html</header>' + result);
      }),
    Promise.resolve(js)
      .then(js => {
        if (js) return hexo.render.render({text: `\`\`\`js${js}\`\`\``, engine: 'markdown'});
      })
      .then(result => {
        if (result) return Promise.resolve('<header style="margin-bottom: -20px">js</header>' + result);
      }),
    Promise.resolve(css)
      .then(css => {
        if (css) return hexo.render.render({text: `\`\`\`css${css}\`\`\``, engine: 'markdown'});
      })
      .then(result => {
        if (result) return Promise.resolve('<header style="margin-bottom: -20px">css</header>' + result);
      })
  ]).then((values) => {
    return `${values.join('')}<style>${css}</style><header style="margin-bottom: -20px">result</header><div class="template">${html}</div><script>${js}</script>`;
  });
}

hexo.extend.tag.register('preview', preview, {ends: true, async: true});
