'use strict';

const { resolve } = require('path');
const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const ajvHelper = require('../../lib/console/ajv-helper');

describe('ajv check', () => {
  it('check default config', () => {
    const config = load(readFileSync(resolve(__dirname, '../../_config.yml'), 'utf-8'));
    const {valid} = ajvHelper(config);
    valid.should.be.true;
  });

  it('check fail, when config is not correct', () => {
    const config = load(readFileSync(resolve(__dirname, '../../_config.yml'), 'utf-8'));
    config.author.avatar = 'avatar';
    const {valid, validate} = ajvHelper(config);
    valid.should.be.false;
    const err = validate.errors[0];
    err.instancePath.should.eql('/author/avatar');
  });
});
