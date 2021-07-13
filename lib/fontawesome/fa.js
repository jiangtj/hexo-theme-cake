'use strict';

const { library, dom, icon: getIcon } = require('@fortawesome/fontawesome-svg-core');

function tryInstall(block) {
  try {
    const icons = block();
    library.add(icons);
    return true;
  } catch (ex) {
    return false;
  }
}

tryInstall(() => { return require('@fortawesome/free-solid-svg-icons').fas; });
tryInstall(() => { return require('@fortawesome/free-regular-svg-icons').far; });
tryInstall(() => { return require('@fortawesome/free-brands-svg-icons').fab; });

function faCss() {
  return dom.css();
}

function faInline(iconName, opts) {
  const options = opts || {prefix: 'fas'};
  const prefix = options.prefix;

  const icon = getIcon({ prefix: prefix, iconName: iconName });
  if (!icon) {
    throw new Error(
      'Can not find icon "' + iconName + '" with prefix "' + prefix + '"'
      + 'Make sure you have installed also a corresponding icons package:\n'
      + ' - @fortawesome/free-solid-svg-icons for fas prefix \n'
      + ' - @fortawesome/free-regular-svg-icons for far prefix\n'
      + ' - @fortawesome/free-brands-svg-icons for fab prefix\n'
    );
  }
  return icon.html;
}

module.exports = {faCss, faInline};
