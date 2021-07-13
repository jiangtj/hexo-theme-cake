'use strict';

const { readJsonFile } = require('../utils');
const { join } = require('path');


module.exports = hexo => {
  const check = () => {
    const { log, base_dir, theme_dir } = hexo;
    const { statSync, writeFileSync, readFileSync } = require('fs');
    const { load } = require('js-yaml');
    const semver = require('semver');
    const inquirer = require('inquirer');
    const file = join(base_dir, '_config.cake.yml');
    const { deepMerge } = require('hexo-util');

    Promise.resolve()
      // check hexo version
      .then(() => {
        if (semver.satisfies(hexo.env.version, '<5.0.0')) {
          log.error('Please add @jiangtj/hexo-patch-load-theme-config or upgrade hexo to 5.x!');
        }
      })

      // check `_config.cake.yml`
      .then(() => {
        statSync(file);
        log.info('_config.cake.yml exsit!');
      })
      .catch(() => {
        return inquirer
          .prompt([{
            name: 'ok',
            type: 'confirm',
            message: 'Do you create \'_config.cake.yml\'?'
          }])
          .then(({ok}) => {
            if (ok) {
              writeFileSync(file, [
                '# Put your theme config here',
                '# All configuration see: https://github.com/jiangtj/hexo-theme-cake/blob/master/_config.yml'
              ].join('\n'));
              log.info('\'_config.cake.yml\' create success!');
            } else {
              log.error('\'_config.cake.yml\' create fail!');
            }
          });
      })

      // check json schema
      .then(() => {
      // http://json-schema.org/understanding-json-schema/reference/index.html
      // https://github.com/ajv-validator/ajv
        const Ajv = require('ajv').default;
        const ajv = new Ajv();
        const validate = ajv.compile(load(readFileSync(join(__dirname, 'schema.yml'), 'utf-8')));
        let config = load(readFileSync(join(theme_dir, '_config.yml'), 'utf-8'));
        if (hexo.config.theme_config) {
          config = deepMerge(config, hexo.config.theme_config);
        }
        const valid = validate(config);
        if (valid) {
          log.info('Congratulations, your theme configuration is correct!');
        } else {
          validate.errors.forEach(item => {
            log.error(`hexo.theme${item.dataPath} ${item.message}`);
          });
        }
        const themeP = readJsonFile(join(theme_dir, 'package.json'));
        log.info(`Default config see: https://github.com/jiangtj/hexo-theme-cake/blob/v${themeP.version}/_config.yml !`);
      });
  };

  hexo.extend.console.register('check', 'Check whether the environment is complete', {}, check);
};
