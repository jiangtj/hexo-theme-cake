'use strict';

const { ref } = require('../../lib/utils');

describe('favicon', () => {

  const options = {value: null};
  const optionsRef = ref(() => options.value);
  const url_for = nohand => nohand;
  const local = {url_for};
  const faviconHelper = require('../../lib/helpers/favicon')(optionsRef).bind(local);

  it('head.favicons is null', () => {
    faviconHelper().should.eql('');
  });

  it('test some href', () => {
    options.value = [
      {rel: 'icon', type: 'image/png', sizes: '64x64', href: '/images/favicon-64.png'},
      {rel: 'mask-icon', color: 'red', href: '/images/favicon.svg'}
    ];
    faviconHelper().should.eql('<link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png" /><link rel="mask-icon" color="red" href="/images/favicon.svg" />');
  });
});
