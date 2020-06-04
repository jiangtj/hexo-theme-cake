'use strict';

const { readJsonFile } = require('../utils');
const { join } = require('path');


module.exports = hexo => {
  const check = () => {
    const { log, base_dir, theme_dir } = hexo;
    const hexoP = readJsonFile(join(base_dir, 'package.json'));
    const themeP = readJsonFile(join(theme_dir, 'package.json'));

    if (!hexoP.dependencies['hexo-theme-cake']) {
      log.warn('You have not installed hexo-theme-cake. Please install it!');
      log.warn('  npm i hexo-theme-cake');
      log.warn('  yarn add hexo-theme-cake');
      return;
    }

    const { statSync, writeFileSync, readFileSync } = require('fs');
    const { execSync } = require('child_process');
    const { safeLoad } = require('js-yaml');
    const semver = require('semver');
    const inquirer = require('inquirer');
    const file = join(base_dir, '_config.cake.yml');
    const { deepMerge } = require('hexo-util');

    Promise.resolve()
    // check @jiangtj/hexo-patch-load-theme-config
      .then(() => {
        if (semver.satisfies(hexo.env.version, '>=5.0.0') || hexoP.dependencies['@jiangtj/hexo-patch-load-theme-config']) {
          return;
        }
        return inquirer
          .prompt([{
            name   : 'patch',
            type   : 'confirm',
            message: 'Your hexo version < 5.0.0, require \'@jiangtj/hexo-patch-load-theme-config\' to load theme config, do you want to install?'
          }])
          .then(({patch}) => {
            if (patch) {
              return inquirer
                .prompt([{
                  name   : 'cli',
                  type   : 'list',
                  message: 'Which tool would you like to use?',
                  choices: [
                    { name: 'npm', value: 'npm' },
                    { name: 'yarn', value: 'yarn' }
                  ]
                }])
                .then(({cli}) => {
                //spawnSync(cli, ['add', '@jiangtj/hexo-patch-load-theme-config']);
                  log.info(`${cli} add @jiangtj/hexo-patch-load-theme-config ......`);
                  execSync(`${cli} add @jiangtj/hexo-patch-load-theme-config`);
                });
            }
            log.error('Can\'t load _config.cake.yml!');
          });
      })

      // check `_config.cake.yml`
      .then(() => {
        statSync(file);
        log.info('_config.cake.yml exsit!');
      })
      .catch(() => {
        return inquirer
          .prompt([{
            name   : 'ok',
            type   : 'confirm',
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
        const Ajv = require('ajv');
        const ajv = new Ajv();
        const validate = ajv.compile(readJsonFile(join(__dirname, 'schema.json')));
        let config = safeLoad(readFileSync(join(theme_dir, '_config.yml'), 'utf-8'));
        if (hexo.config.theme_config) {
          config = deepMerge(config, hexo.config.theme_config);
        }
        var valid = validate(config);
        if (valid) {
          log.info('Congratulations, your theme configuration is correct!');
        } else {
          validate.errors.forEach(item => {
            log.error(`hexo.theme${item.dataPath} ${item.message}`);
          });
        }
        log.info(`Default config see: https://github.com/jiangtj/hexo-theme-cake/blob/v${themeP.version}/_config.yml !`);
      });
  };

  hexo.extend.console.register('check', 'Check whether the environment is complete', {}, check);
};
