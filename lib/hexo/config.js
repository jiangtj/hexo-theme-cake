'use strict';

module.exports = hexo => {
  hexo.on('generateBefore', () => {
    if (hexo.config.relative_link) {
      hexo.config.relative_link = false;
      hexo.log.warn('`relative_link` has been set to false for better generate speed.');
    }
    // highlight
    hexo.config.highlight.enable = false;
    // external_link
    if (hexo.config.external_link === true) {
      hexo.config.external_link = {
        enable: true
      };
    }
    hexo.config.marked = Object.assign({
      external_link: {
        enable  : hexo.config.external_link.enable,
        exclude : hexo.config.external_link.exclude,
        nofollow: false
      }
    }, hexo.config.marked);
    // NexT
    hexo.theme.config.scheme = 'Gemini';
  });
};
