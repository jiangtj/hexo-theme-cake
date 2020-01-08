'use strict';

class Injector {
  constructor() {
    this.store = {};
  }

  list() {
    return this.store;
  }

  get(entry) {
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

  is(type) {
    let predicate = locals => locals.page[type];
    switch (type) {
      case 'home': predicate = locals => locals.page.__index; break;
      case 'post': predicate = locals => locals.page.__post; break;
      case 'page': predicate = locals => locals.page.__page; break;
      case 'archive': predicate = locals => locals.page.archive; break;
      case 'category': predicate = locals => locals.page.category; break;
      case 'tag': predicate = locals => locals.page.tag; break;
    }
    return predicate;
  }
}

module.exports = Injector;
