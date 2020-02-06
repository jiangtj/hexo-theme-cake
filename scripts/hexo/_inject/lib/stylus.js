'use strict';

const { nodes } = require('stylus');
const { resolve } = require('path');

module.exports = (ctx, filter, injector) => {
  filter.register('stylus:renderer', style => {
    style.define('injector', data => {
      let expr = new nodes.Expression()
      expr.isList = true;
      injector.get(data.val).list()
        .map(item => resolve(ctx.base_dir, item.value))
        .map(item => new nodes.String(item))
        .forEach(item => expr.push(item));
      return new nodes.Each('$inject_val', '$inject_key', expr,
        new nodes.Import(new nodes.Ident('$inject_val'))
      );
    });
  });
}