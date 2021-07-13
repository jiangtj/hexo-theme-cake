'use strict';

const { ref } = require('../../lib/utils');

describe('post nav', () => {

  const options = {value: false};
  const optionsRef = ref(() => options.value);
  const url_for = nohand => nohand;
  const local = {url_for};
  const postNavHelper = require('../../lib/helpers/post-nav')(optionsRef).bind(local);

  const prev = {
    title: 'prev',
    path: 'prev-path'
  };

  const next = {
    title: 'next',
    path: 'next-path'
  };

  it('post.navigation is false', () => {
    postNavHelper({prev, next}).should.eql('');
  });

  it('prev&next is empty', () => {
    options.value = 'left';
    postNavHelper({}).should.eql('');
  });

  it('prev or next is empty', () => {
    options.value = 'left';
    postNavHelper({prev}).should.include('<a href="prev-path" rel="next" title="prev">');
    postNavHelper({next}).should.include('<a href="next-path" rel="prev" title="next">');
  });

  it('post.navigation is right', () => {
    options.value = 'right';
    postNavHelper({prev, next})
      .should.include('<a href="prev-path" rel="prev" title="prev">')
      .with.include('<a href="next-path" rel="next" title="next">');
  });
});
