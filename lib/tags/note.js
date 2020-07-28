/**
 * note.js
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

'use strict';

module.exports = hexo => {

  function getIconName(style) {
    switch (style) {
      case 'primary': return 'plus-circle';
      case 'info': return 'info-circle';
      case 'success': return 'check-circle';
      case 'warning': return 'exclamation-circle';
      case 'danger': return 'minus-circle';
      default: return 'arrow-circle-right';
    }
  }

  function postNote(args, content) {

    let style = 'default';
    let title = '';
    let icon = true;
    let iconBtn = '';

    if (Array.isArray(args)) {

      const iconIndex = args.indexOf('icon:disable');
      if (iconIndex > -1) {
        icon = false;
        args.splice(iconIndex, 1);
      }

      if (args.length > 0) {
        style = args.shift();
      }

      if (icon) {
        const fa = hexo.extend.helper.get('fa_inline').bind(hexo);
        iconBtn = fa(getIconName(style), {prefix: 'fas'});
      } else {
        style += ' no-icon';
      }

      if (args.length > 0) {
        title = '<header>' + args.join(' ') + '</header>';
      }

    }

    return `<div class="note ${style}">${iconBtn}${title}${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}</div>`;
  }

  hexo.extend.tag.register('note', postNote, {ends: true});
};
