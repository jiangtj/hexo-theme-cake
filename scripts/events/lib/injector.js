'use strict';

class Injector {
  constructor() {
    this.store = {};
  }

  list() {
    return this.store;
  }

  get(entry) {
    return Array.from(this.store[entry] || []);
  }

  getText(entry, locals) {
    return this.get(entry)
      .filter(item => item.predicate(locals))
      .sort((a, b) => a.priority - b.priority)
      .map(item => {
        let value = item.value;
        if (typeof value === 'function') {
          return value(locals);
        }
        return value;
      })
      .join('');
  }

  register(entry, value, predicate = () => true, priority = 10) {
    if (!entry) throw new TypeError('entry is required');
    this.store[entry] = this.store[entry] || [];

    if (typeof predicate === 'string') {
      predicate = this.is(predicate);
    }

    if (typeof value === 'object') {
      this.store[entry].push(Object.assign({ predicate, priority }, value));
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
