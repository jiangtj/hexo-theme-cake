'use strict';

module.exports = hexo => {

  const {filter} = hexo.extend;

  const removeFilter = (type, name) => {
    const filters = filter.list()[type];
    if (!filters) {
      return;
    }
    for (const fn of filters) {
      if (fn.name === name) {
        filter.unregister(type, fn);
      }
    }
  };

  removeFilter('after_render:html', 'hexoMetaGeneratorInject');
  removeFilter('after_route_render', 'hexoMetaGeneratorInject');
};
