/**
 * note.js | https://theme-next.org/docs/tag-plugins/note
 *
 * {%- note [type [title]] [icon:disable] %}
 * content
 * {%- endnote %}
 *
 * Example:
 * {%- note default default title icon:disable %}
 * content
 * {%- endnote %}
 *
 */

/* global hexo */

'use strict';

function postNote(args, content) {

  let style = 'default';
  let title = '';
  let icon = true;

  if (Array.isArray(args)) {

    let iconIndex = args.indexOf('icon:disable');
    if (iconIndex > -1) {
      icon = false;
      args.splice(iconIndex, 1);
    }

    if (args.length > 0) {
      style = args.shift();
    }

    if (!icon) {
      style += ' no-icon';
    }

    if (args.length > 0) {
      title = '<header>' + args.join(' ') + '</header>';
    }

  }

  return `<div class="note ${style}">${title}${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}</div>`;
}

hexo.extend.tag.register('note', postNote, {ends: true});
