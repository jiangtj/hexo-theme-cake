/* global NexT, CONFIG */

HTMLElement.prototype.outerHeight = function(flag) {
  var height = this.offsetHeight;
  if (!flag) return height;
  var style = window.getComputedStyle(this);
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

NexT.utils = NexT.$u = {

  /**
   * Menu Active.
   * Todo simpler
   */
  registerActiveMenuItem: function() {
    document.querySelectorAll('#menu .menu-item').forEach(element => {
      var target = element.querySelector('a[href]');
      var isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
      var isSubPath = target.pathname !== CONFIG.root && location.pathname.indexOf(target.pathname) === 0;
      if (target.hostname === location.hostname && (isSamePath || isSubPath)) {
        element.classList.add('menu-item-active');
      }
    });
    document.querySelectorAll('#sub-menu .menu-item').forEach(element => {
      var target = element.querySelector('a[href]');
      var isSamePath = target.pathname === location.pathname || target.pathname === location.pathname.replace('index.html', '');
      if (target.hostname === location.hostname && isSamePath) {
        element.classList.add('menu-item-active');
      }
    });
  },

  registerScrollSave: function() {
    if (!CONFIG.scroll.save) return;
    let scrollKey = 'scroll:' + location.pathname;
    let timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        localStorage.setItem(scrollKey, window.scrollY);
      }, 250);
    });
    let scrollToPosition = localStorage.getItem(scrollKey);
    if (scrollToPosition !== undefined) {
      window.scroll({top: scrollToPosition});
    }
  },

  registerSidebarTOC: function() {
    const navItems = document.querySelectorAll('.post-toc li');
    const sections = [...navItems].map(element => {
      var link = element.querySelector('a.nav-link');
      // TOC item animation navigate.
      link.addEventListener('click', event => {
        event.preventDefault();
        var target = document.getElementById(event.currentTarget.getAttribute('href').replace('#', ''));
        var offset = target.getBoundingClientRect().top + window.scrollY + 1;
        window.scroll({
          top     : offset,
          behavior: 'smooth'
        });
      });
      return document.getElementById(link.getAttribute('href').replace('#', ''));
    });

    var tocElement = document.querySelector('.post-toc-wrap');
    function activateNavByIndex(target) {
      if (target.classList.contains('active-current')) return;

      document.querySelectorAll('.post-toc .active').forEach(element => {
        element.classList.remove('active', 'active-current');
      });
      target.classList.add('active', 'active-current');
      var parent = target.parentNode;
      while (!parent.matches('.post-toc')) {
        if (parent.matches('li')) parent.classList.add('active');
        parent = parent.parentNode;
      }
      // Scrolling to center active TOC element if TOC content is taller then viewport.
      tocElement.scroll({
        top     : tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top,
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
      let intersectionObserver = new IntersectionObserver((entries, observe) => {
        let scrollHeight = document.documentElement.scrollHeight + 100;
        if (scrollHeight > marginTop) {
          observe.disconnect();
          createIntersectionObserver(scrollHeight);
          return;
        }
        let index = findIndex(entries);
        activateNavByIndex(navItems[index]);
      }, {
        rootMargin: marginTop + 'px 0px -100% 0px',
        threshold : 0
      });
      sections.forEach(item => intersectionObserver.observe(item));
    }
    createIntersectionObserver(document.documentElement.scrollHeight);

  },

  registerReward: function() {
    let rewardBox = document.querySelector('.reward-box');
    function initRewardBox() {
      rewardBox.childNodes.forEach(boxNode => {
        if (boxNode.nodeType !== 1) {
          return;
        }
        boxNode.style.display = 'none';
      });
    }
    document.querySelectorAll('.reward-button').forEach(btnNode => {
      btnNode.addEventListener('mouseover', () => {
        initRewardBox();
        let active = btnNode.classList[1];
        rewardBox.querySelector(`.${active}`).style.display = 'block';
        rewardBox.classList.add('active');
      });
    });
    let rewardContainer = document.querySelector('.reward-container');
    if (rewardContainer) {
      rewardContainer.addEventListener('mouseleave', () => {
        rewardBox.classList.remove('active');
      });
    }
  },

  wrapTableWithBox: function() {
    document.querySelectorAll('table').forEach(table => {
      const box = document.createElement('div');
      box.className = 'table-container';
      table.wrap(box);
    });
  },

  hasMobileUA: function() {
    var nav = window.navigator;
    var ua = nav.userAgent;
    var pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;

    return pa.test(ua);
  },

  isTablet: function() {
    return window.screen.width < 992 && window.screen.width > 767 && this.hasMobileUA();
  },

  isMobile: function() {
    return window.screen.width < 767 && this.hasMobileUA();
  },

  isDesktop: function() {
    return !this.isTablet() && !this.isMobile();
  }
};

NexT.boot = {};

NexT.boot.registerEvents = function() {

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
  NexT.utils.registerActiveMenuItem();
  NexT.utils.registerSidebarTOC();
  NexT.utils.registerScrollSave();
  NexT.utils.registerReward();
  NexT.utils.wrapTableWithBox();
};

// scroll
window.addEventListener('DOMContentLoaded', () => {
  NexT.boot.registerEvents();
  NexT.boot.refresh();
});
