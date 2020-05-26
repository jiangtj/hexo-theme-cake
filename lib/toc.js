'use strict';

const { Cache } = require('hexo-util');
const cheerio = require('cheerio');
const cache = new Cache();

module.exports = hexo => {
  const { filter, helper } = hexo.extend;

  filter.register('marked:renderer', function(renderer) {
    let originalRender = renderer.heading.bind(renderer);
    renderer.heading = (...args) => {
      let content = originalRender.apply(renderer, args);
      let text = args[0];
      let level = args[1];
      let $ = cheerio.load(content, { decodeEntities: false });
      let el = $(`h${level}`);
      var id = el.attr('id');
      if (renderer.options.config.source) {
        let arr = cache.get(renderer.options.config.source) || [];
        arr.push({ text, level, id });
        cache.set(renderer.options.config.source, arr);
      }
      return content;
    };
  });

  helper.register('cake_toc', function(str, options = {}) {
    const data = cache.get(this.page.full_source);
    if (!data) {
      return this.toc(str, options);
    }

    options = Object.assign({
      min_depth  : 1,
      max_depth  : 6,
      class      : 'toc',
      list_number: true
    }, options);

    if (!data.length) return '';

    const className = options.class;
    const listNumber = options.list_number;

    let result = `<ol class="${className}">`;
    const lastNumber = [0, 0, 0, 0, 0, 0];
    let firstLevel = 0;
    let lastLevel = 0;

    for (let i = 0, len = data.length; i < len; i++) {
      const el = data[i];
      const { level, id, text } = el;

      lastNumber[level - 1]++;

      for (let i = level; i <= 5; i++) {
        lastNumber[i] = 0;
      }

      if (firstLevel) {
        for (let i = level; i < lastLevel; i++) {
          result += '</li></ol>';
        }

        if (level > lastLevel) {
          result += `<ol class="${className}-child">`;
        } else {
          result += '</li>';
        }
      } else {
        firstLevel = level;
      }

      result += `<li class="${className}-item ${className}-level-${level}">`;
      result += `<a class="${className}-link" href="#${id}">`;

      if (listNumber) {
        result += `<span class="${className}-number">`;

        for (let i = firstLevel - 1; i < level; i++) {
          result += `${lastNumber[i]}.`;
        }

        result += '</span> ';
      }

      result += `<span class="${className}-text">${text}</span></a>`;

      lastLevel = level;
    }

    for (let i = firstLevel - 1; i < lastLevel; i++) {
      result += '</li></ol>';
    }

    return result;
  });
};
