/* global NexT, CONFIG */

NexT.boot = {};

NexT.boot.registerEvents = function() {

  NexT.utils.registerScrollPercent();

  // Mobile top menu bar.
  document.querySelector('.site-nav-toggle button').addEventListener('click', () => {
    var siteNav = document.querySelector('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    siteNav.classList.toggle(ON_CLASS_NAME);
  });

  document.querySelectorAll('.sidebar-nav li').forEach((element, index) => {
    element.addEventListener('click', event => {
      var item = event.currentTarget;
      var activeTabClassName = 'sidebar-nav-active';
      var activePanelClassName = 'sidebar-panel-active';
      if (item.classList.contains(activeTabClassName)) return;

      var targets = document.querySelectorAll('.sidebar-panel');
      var target = targets[index];
      var currentTarget = targets[1 - index];
      currentTarget.classList.remove(activePanelClassName);
      target.classList.add(activePanelClassName);

      [...item.parentNode.children].forEach(element => {
        element.classList.remove(activeTabClassName);
      });
      item.classList.add(activeTabClassName);
    });
  });

  window.addEventListener('hashchange', () => {
    var tHash = location.hash;
    if (tHash !== '' && !tHash.match(/%\S{2}/)) {
      var target = document.querySelector(`.tabs ul.nav-tabs li a[href="${tHash}"]`);
      target && target.click();
    }
  });
};

NexT.boot.refresh = function() {
  CONFIG.copycode.enable && NexT.utils.registerCopyCode();
  NexT.utils.registerActiveMenuItem();
  NexT.utils.registerSidebarTOC();
  NexT.utils.registerScrollSave();
  NexT.utils.wrapTableWithBox();
};

// scroll
window.addEventListener('DOMContentLoaded', () => {
  NexT.boot.registerEvents();
  NexT.boot.refresh();
});
