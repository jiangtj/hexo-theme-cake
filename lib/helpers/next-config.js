'use strict';

module.exports = hexo => {

  const {Cache} = require('hexo-util');
  const cache = new Cache();

  hexo.extend.helper.register('next_config', function() {
    return cache.apply('config', () => {
      let {theme, cake_version} = this;
      let config = {
        root    : theme.root,
        scheme  : theme.scheme,
        version : cake_version,
        sidebar : theme.sidebar,
        comments: theme.comments,
        scroll  : {
          save: theme.scroll.save
        }
      };
      return `<script id="hexo.configurations">var NexT = window.NexT || {};var CONFIG = ${JSON.stringify(config)}</script>`;
    });

  });
};
