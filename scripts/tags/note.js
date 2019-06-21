/**
 * note.js | https://theme-next.org/docs/tag-plugins/note
 * 
 * {% note [type [title]] [icon:disable] %}
 * content
 * {% endnote %}
 * 
 * Example:
 * {% note default default title icon:disable %}
 * content
 * {% endnote %}
 * 
 */

/* global hexo */

'use strict';

function postNote(args, content) {
  return `<div class="note ${args.join(' ')}">
            ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
          </div>`;
}

hexo.extend.tag.register('note', postNote, {ends: true});
