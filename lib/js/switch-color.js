'use strict';
/* global NexT CONFIG document */

NexT.utils.switchColor = type => {
  if (!type) {
    const defaultColor = CONFIG.colorType || 'auto';
    switch (defaultColor) {
      case 'auto': type = 'light'; break;
      case 'light': type = 'dark'; break;
      case 'dark': type = 'auto'; break;
    }
  }
  CONFIG.colorType = type;
  let link = document.querySelector('#cake-switch-color');
  if (link) {
    link.href = CONFIG.colorLinks[type];
  } else {
    link = document.createElement('link');
    link.id = 'cake-switch-color';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = CONFIG.colorLinks[type];
    document.head.appendChild(link);
  }
};

const switchColorButton = document.querySelector('#moon-menu-item-switch_color');
if (switchColorButton) {
  switchColorButton.addEventListener('click', () => {
    NexT.utils.switchColor();
  });
}

