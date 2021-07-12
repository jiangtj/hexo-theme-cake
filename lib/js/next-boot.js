'use strict';
/* global NexT CONFIG HTMLElement window document location IntersectionObserver */

HTMLElement.prototype.outerHeight = function(flag) {
  let height = this.offsetHeight;
  if (!flag) return height;
  const style = window.getComputedStyle(this);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
};

HTMLElement.prototype.css = function(dict) {
  Object.assign(this.style, dict);
};

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

NexT.utils = {

  /**
   * Menu Active.
   * Todo simpler
   */
  registerActiveMenuItem: function() {
    document.querySelectorAll('.menu .menu-item').forEach(element => {
      const target = element.querySelector('a[href]');
      const isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
      const isSubPath = target.pathname !== CONFIG.root && location.pathname.indexOf(target.pathname) === 0;
      if (target.hostname === location.hostname && (isSamePath || isSubPath)) {
        element.classList.add('menu-item-active');
      }
    });
    document.querySelectorAll('#sub-menu .menu-item').forEach(element => {
      const target = element.querySelector('a[href]');
      const isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
      if (target.hostname === location.hostname && isSamePath) {
        element.classList.add('menu-item-active');
      }
    });
  },

  registerSidebarTOC: function() {
    const navItems = document.querySelectorAll('.post-toc li');
    const sections = [...navItems].map(element => {
      const link = element.querySelector('a.nav-link');
      const target = document.getElementById(decodeURI(link.getAttribute('href').replace('#', '')));
      // TOC item animation navigate.
      link.addEventListener('click', event => {
        event.preventDefault();
        window.history.pushState(null, document.title, link.href);
        const offset = target.getBoundingClientRect().top + window.scrollY + 1;
        window.scroll({
          top: offset,
          behavior: 'smooth'
        });
      });
      return target;
    });

    const tocElement = document.querySelector('.post-toc-wrap');
    function activateNavByIndex(target) {
      if (target.classList.contains('active-current')) return;

      document.querySelectorAll('.post-toc .active').forEach(element => {
        element.classList.remove('active', 'active-current');
      });
      target.classList.add('active', 'active-current');
      let parent = target.parentNode;
      while (!parent.matches('.post-toc')) {
        if (parent.matches('li')) parent.classList.add('active');
        parent = parent.parentNode;
      }
      // Scrolling to center active TOC element if TOC content is taller then viewport.
      tocElement.scroll({
        top: tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    }

    function findIndex(entries) {
      let index = 0;
      let entry = entries[index];
      if (entry.boundingClientRect.top > 0) {
        index = sections.indexOf(entry.target);
        return index === 0 ? 0 : index - 1;
      }
      for (;index < entries.length; index++) {
        if (entries[index].boundingClientRect.top <= 0) {
          entry = entries[index];
        } else {
          return sections.indexOf(entry.target);
        }
      }
      return sections.indexOf(entry.target);
    }

    function createIntersectionObserver(marginTop) {
      marginTop = Math.floor(marginTop + 10000);
      const intersectionObserver = new IntersectionObserver((entries, observe) => {
        const scrollHeight = document.documentElement.scrollHeight + 100;
        if (scrollHeight > marginTop) {
          observe.disconnect();
          createIntersectionObserver(scrollHeight);
          return;
        }
        const index = findIndex(entries);
        activateNavByIndex(navItems[index]);
      }, {
        rootMargin: marginTop + 'px 0px -100% 0px',
        threshold: 0
      });
      sections.forEach(item => intersectionObserver.observe(item));
    }
    createIntersectionObserver(document.documentElement.scrollHeight);

  },

  wrapTableWithBox: function() {
    document.querySelectorAll('table').forEach(table => {
      const box = document.createElement('div');
      box.className = 'table-container';
      table.wrap(box);
    });
  },

  loadComments: function(element, callback) {
    // if (!CONFIG.comments.lazyload) {
    //   callback();
    //   return;
    // }
    const intersectionObserver = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        callback();
        observer.disconnect();
      }
    });
    intersectionObserver.observe(element);
    return intersectionObserver;
  }
};

NexT.boot = {};

NexT.boot.registerEvents = function() {

  // Mobile top menu bar.
  document.querySelector('.site-nav-toggle button').addEventListener('click', () => {
    const siteNav = document.querySelector('.site-nav');
    const ON_CLASS_NAME = 'site-nav-on';
    siteNav.classList.toggle(ON_CLASS_NAME);
  });

  document.querySelectorAll('.sidebar-nav li').forEach((element, index) => {
    element.addEventListener('click', event => {
      const item = event.currentTarget;
      const activeTabClassName = 'sidebar-nav-active';
      const activePanelClassName = 'sidebar-panel-active';
      if (item.classList.contains(activeTabClassName)) return;

      const targets = document.querySelectorAll('.sidebar-panel');
      const target = targets[index];
      const currentTarget = targets[1 - index];
      currentTarget.classList.remove(activePanelClassName);
      target.classList.add(activePanelClassName);

      [...item.parentNode.children].forEach(element => {
        element.classList.remove(activeTabClassName);
      });
      item.classList.add(activeTabClassName);
    });
  });

  window.addEventListener('hashchange', () => {
    const tHash = location.hash;
    if (tHash !== '' && !tHash.match(/%\S{2}/)) {
      const target = document.querySelector(`.tabs ul.nav-tabs li a[href="${tHash}"]`);
      target && target.click();
    }
  });
};

NexT.boot.refresh = function() {
  NexT.utils.registerActiveMenuItem();
  NexT.utils.registerSidebarTOC();
  NexT.utils.wrapTableWithBox();
};

// scroll
window.addEventListener('DOMContentLoaded', () => {
  NexT.boot.registerEvents();
  NexT.boot.refresh();
});
