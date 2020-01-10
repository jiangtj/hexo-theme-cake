'use strict';

class Injector {
  constructor() {
    this.store = {};
  }

  list() {
    return this.store;
  }

  get(entry) {
    entry = this.formatKey(entry);
    let entries = Array.from(this.store[entry] || []);
    let list = () => entries;
    let bind = (ctx) => list()
      .filter(item => item.predicate(ctx))
      .sort((a, b) => a.priority - b.priority);
    let rendered = (ctx) => bind(ctx).map(item => {
      let renderItem = Object.assign({}, item);
      if (typeof item.value === 'function') {
        renderItem.value = item.value(ctx);
      }
      return renderItem;
    });
    let text = (ctx) => rendered(ctx).map(item => item.value).join('');
    return {list, bind, rendered, text};
  }

  register(entry, value, predicate = () => true, priority = 10) {
    if (!entry) throw new TypeError('entry is required');
    entry = this.formatKey(entry);
    this.store[entry] = this.store[entry] || [];

    if (typeof predicate === 'string') {
      predicate = this.is(predicate);
    }

    if (typeof value === 'object') {
      this.store[entry].push(Object.assign({ predicate, priority }, value));
      return;
    }
    this.store[entry].push({ value, predicate, priority });
  }

  is(...types) {
    return locals => {
      for (const type of types) {
        if (type === 'home' && locals.page.__index) return true;
        if (type === 'post' && locals.page.__post) return true;
        if (type === 'page' && locals.page.__page) return true;
        if (type === 'archive' && locals.page.archive) return true;
        if (type === 'category' && locals.page.category) return true;
        if (type === 'tag' && locals.page.tag) return true;
        if (locals.page[type]) return true;
      }
      return false;
    };
  }

  formatKey(entry) {
    return entry.replace(/[-| |_]/g, '').toLowerCase();
  }
}

module.exports = Injector;
