/**
 * button.js | https://theme-next.org/docs/tag-plugins/button
 */
'use strict';

module.exports = (ctx, iconFn) => args => {
  args = args.join(' ').split(',');
  const url = args[0];
  let text = args[1] || '';
  let icon = args[2] || '';
  let title = args[3] || '';

  if (!url) {
    ctx.log.warn('URL can NOT be empty');
  }

  text = text.trim();
  icon = icon.trim();
  title = title.trim();

  const result = [`<a class="btn" href="${url}"`];
  title.length > 0 && result.push(` title="${title}"`);
  result.push('>');

  icon.length > 0 && result.push(iconFn(icon));

  text.length > 0 && result.push(text);
  result.push('</a>');

  return result.join('');
};
