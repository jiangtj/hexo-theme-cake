'use strict';
/* global NexT CONFIG document localStorage */

const switchColorButton = document.querySelector('#moon-menu-item-switch_color');

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
    link.href = CONFIG.colorLinks[type].path;
  } else {
    link = document.createElement('link');
    link.id = 'cake-switch-color';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = CONFIG.colorLinks[type].path;
    document.head.appendChild(link);
  }

  // 更新icon
  const icon = CONFIG.colorLinks[type].icon;
  if (switchColorButton) {
    switchColorButton.innerHTML = icon;
  }
  localStorage.setItem('cake-color', type);
};

if (switchColorButton) {
  switchColorButton.addEventListener('click', () => {
    NexT.utils.switchColor();
  });
}

const cakeColor = localStorage.getItem('cake-color');
if (cakeColor) {
  NexT.utils.switchColor(cakeColor);
}
