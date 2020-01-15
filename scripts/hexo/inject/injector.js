'use strict';

class Injector {
  constructor() {
    this._store = {};
    this._run = {};
  }

  clean() {
    this._run = {};
  }

  get(entry) {
    entry = this.formatKey(entry);
    let _storeEntries = Array.from(this._store[entry] || []);
    let _runEntries = Array.from(this._run[entry] || []);
    let list = () => _storeEntries.concat(_runEntries);
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

  register(entry, value, predicate = () => true, priority = 10, isRun) {
    if (!entry) throw new TypeError('entry is required');
    entry = this.formatKey(entry);

    if (typeof value !== 'object') {
      value = { value };
    }
    let options = Object.assign({ predicate, priority, isRun }, value);

    let store = options.isRun ? this._run : this._store;
    store[entry] = store[entry] || [];

    if (typeof options.predicate === 'string') {
      options.predicate = this.is(options.predicate);
    }

    store[entry].push(options);
    return this;
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
