/* global hexo */

const {isExternalLink} = require('hexo-util');
const {filter} = hexo.extend;

const afterPostRenders = filter.list().after_post_render;
for (let fn of afterPostRenders) {
  if (fn.name === 'externalLinkFilter') {
    filter.unregister('after_post_render', fn);
  }
}
const afterRenders = filter.list()['after_render:html'];
for (let fn of afterRenders) {
  if (fn.name === 'externalLinkFilter') {
    filter.unregister('after_render:html', fn);
  }
}

const external_link = Object.assign({
  enable : true,
  field  : 'site',
  exclude: []
}, hexo.config.external_link);

const exclude = Array.isArray(external_link.exclude) ? external_link.exclude
  : [external_link.exclude];

function getExternalLink(href) {
  if (external_link) {
    let target = ' target="_blank"';
    let noopener = ' rel="noopener"';
    let nofollowTag = ' rel="noopener external nofollow noreferrer"';
    if (isExternalLink(href, hexo.config.url, exclude)) {
      if (external_link.enable && external_link.nofollow) {
        return target + nofollowTag;
      } else if (external_link.enable) {
        return target + noopener;
      } else if (external_link.nofollow) {
        return nofollowTag;
      }
    }
  } else {
    return '';
  }
}

filter.register('marked:link', (data, options) => {
  let { href, text } = data;
  let extAttr = getExternalLink(href);
  data.content = data.content.replace(`>${text}</a>`, `${extAttr}>${text}</a>`);
});
