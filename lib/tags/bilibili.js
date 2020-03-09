'use strict';

module.exports = hexo => {

  /**
 * {%- bilibili aid cid %}
 */
  function renderBilibili(args) {
    var aid   = args[0];
    var cid  = args[1];
    var page  = args[2] || '1';

    if (!aid || !cid) {
      hexo.log.warn('aid or cid can not be empty!');
    }

    return `
  <p style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="//player.bilibili.com/player.html?aid=${aid}&cid=${cid}&page=${page}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true">
    </iframe>
  </p>
  `;
  }

  hexo.extend.tag.register('bilibili', renderBilibili, { ends: false });
};
