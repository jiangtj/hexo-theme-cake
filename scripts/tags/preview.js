/**
 * center-quote.js | https://theme-next.org/docs/tag-plugins/
 */

/* global hexo */

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

  let out = '';
  if (html) {
    out += '<header style="margin-bottom: -20px">html</header>' + hexo.render.renderSync({text: `\`\`\`html${html}\`\`\``, engine: 'markdown'});
  }
  if (js) {
    out += '<header style="margin-bottom: -20px">js</header>' + hexo.render.renderSync({text: `\`\`\`js${js}\`\`\``, engine: 'markdown'});
  }
  if (css) {
    out += '<header style="margin-bottom: -20px">css</header>' + hexo.render.renderSync({text: `\`\`\`js${css}\`\`\``, engine: 'markdown'});
  }
  return `${out}<style>${css}</style><header style="margin-bottom: -20px">result</header>${html}<script>${js}</script>`;
}

hexo.extend.tag.register('preview', preview, {ends: true});
