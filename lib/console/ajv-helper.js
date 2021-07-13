'use strict';

const { join } = require('path');
const { readFileSync } = require('fs');
const { load } = require('js-yaml');

// http://json-schema.org/understanding-json-schema/reference/index.html
// https://github.com/ajv-validator/ajv
module.exports = config => {
  const Ajv = require('ajv').default;
  const ajv = new Ajv();
  const validate = ajv.compile(load(readFileSync(join(__dirname, 'schema.yml'), 'utf-8')));
  const valid = validate(config);
  return {validate, valid};
};
