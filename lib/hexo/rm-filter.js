'use strict';

module.exports = hexo => {

  const {filter} = hexo.extend;

  const removeFilter = (type, name) => {
    let filters = filter.list()[type];
    if (!filters) {
      return;
    }
    for (let fn of filters) {
      if (fn.name === name) {
        filter.unregister(type, fn);
      }
    }
  };

  removeFilter('before_post_render', 'backtickCodeBlock');

  removeFilter('after_render:html', 'hexoMetaGeneratorInject');
  removeFilter('after_route_render', 'hexoMetaGeneratorInject');

  removeFilter('after_render:html', 'externalLinkFilter');
  removeFilter('after_route_render', 'externalLinkFilter');
  removeFilter('after_post_render', 'externalLinkFilter');
};
