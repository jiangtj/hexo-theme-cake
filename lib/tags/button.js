/**
 * button.js | https://theme-next.org/docs/tag-plugins/button
 */
'use strict';

module.exports = hexo => {

  function postButton(args) {
    args = args.join(' ').split(',');
    var url   = args[0];
    var text  = args[1] || '';
    var icon  = args[2] || '';
    var title = args[3] || '';

    if (!url) {
      hexo.log.warn('URL can NOT be empty');
    }

    text = text.trim();
    icon = icon.trim();
    title = title.trim();

    var result = [`<a class="btn" href="${url}"`];
    title.length > 0 && result.push(` title="${title}"`);
    result.push('>');

    let iconFn = params => {
      let data = params.split(' ');
      const fa = hexo.extend.helper.get('fa_inline');
      return fa(data[1].substring(3), {prefix: data[0]});
    };
    icon.length > 0 && result.push(iconFn(icon));

    text.length > 0 && result.push(text);
    result.push('</a>');

    return result.join('');
  }

  hexo.extend.tag.register('button', postButton, {ends: false});
  hexo.extend.tag.register('btn', postButton, {ends: false});
};
