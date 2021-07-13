'use strict';

const Hexo = require('hexo');
const hexo = new Hexo();
const { iconRender } = require('../../lib/utils');

describe('button', () => {

  const postButton = require('../../lib/tags/button')(hexo, icon => {
    if (!icon.startsWith('fa')) icon = 'fa fa-' + icon;
    icon = `<i class="${icon}"></i>`;
    return icon;
  });

  it('only url', () => {
    postButton(['#']).should.eql('<a class="btn" href="#"></a>');
  });

  it('url and text', () => {
    postButton('#, Hello world'.split(' ')).should.eql('<a class="btn" href="#">Hello world</a>');
  });

  it('url and icon', () => {
    postButton('#,, fab fa-fort-awesome'.split(' ')).should.eql(`<a class="btn" href="#">${iconRender('fab fa-fort-awesome')}</a>`);
  });

  it('url, text and title', () => {
    postButton('#, Hello world,, Title'.split(' ')).should.eql('<a class="btn" href="#" title="Title">Hello world</a>');
  });

  it('url, text, icon and title', () => {
    postButton('#, Hello world, fas fa-home, Title'.split(' ')).should.eql(`<a class="btn" href="#" title="Title">${iconRender('fas fa-home')}Hello world</a>`);
  });
});
