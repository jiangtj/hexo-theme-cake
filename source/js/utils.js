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

  /**
   * One-click copy code support.
   */
  registerCopyCode: function() {
    document.querySelectorAll('figure.highlight').forEach(e => {
      const initButton = button => {
        if (CONFIG.copycode.style === 'mac') {
          button.innerHTML = '<i class="fa fa-clipboard"></i>';
        } else {
          button.innerText = CONFIG.translation.copy_button;
        }
      };
      const box = document.createElement('div');
      box.classList.add('highlight-wrap');
      e.wrap(box);
      e.parentNode.insertAdjacentHTML('beforeend', '<div class="copy-btn"></div>');
      var button = e.parentNode.querySelector('.copy-btn');
      button.addEventListener('click', event => {
        var code = [...event.currentTarget.parentNode.querySelectorAll('.code .line')].map(element => {
          return element.innerText;
        }).join('\n');
        var ta = document.createElement('textarea');
        var yPosition = window.scrollY;
        ta.style.top = yPosition + 'px'; // Prevent page scrolling
        ta.style.position = 'absolute';
        ta.style.opacity = '0';
        ta.readOnly = true;
        ta.value = code;
        document.body.append(ta);
        const selection = document.getSelection();
        const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
        ta.select();
        ta.setSelectionRange(0, code.length);
        ta.readOnly = false;
        var result = document.execCommand('copy');
        if (CONFIG.copycode.show_result) {
          event.currentTarget.innerText = result ? CONFIG.translation.copy_success : CONFIG.translation.copy_failure;
        }
        ta.blur(); // For iOS
        event.currentTarget.blur();
        if (selected) {
          selection.removeAllRanges();
          selection.addRange(selected);
        }
        document.body.removeChild(ta);
      });
      button.addEventListener('mouseleave', event => {
        setTimeout(() => {
          initButton(event.target);
        }, 300);
      });
      initButton(button);
    });
  },

  registerScrollPercent: function() {
    var THRESHOLD = 50;
    var backToTop = document.querySelector('.back-to-top');
    // For init back to top in sidebar if page was scrolled after page refresh.
    window.addEventListener('scroll', () => {
      var scrollPercent;
      if (backToTop) {
        var docHeight = document.querySelector('.container').offsetHeight;
        var winHeight = window.innerHeight;
        var contentVisibilityHeight = docHeight > winHeight ? docHeight - winHeight : document.body.scrollHeight - winHeight;
        var scrollPercentRounded = Math.round(100 * window.scrollY / contentVisibilityHeight);
        scrollPercent = Math.min(scrollPercentRounded, 100) + '%';
      }
      if (backToTop) {
        window.scrollY > THRESHOLD ? backToTop.classList.add('back-to-top-on') : backToTop.classList.remove('back-to-top-on');
        backToTop.querySelector('span').innerText = scrollPercent;
      }
    });

    backToTop && backToTop.addEventListener('click', () => {
      window.scroll({
        top     : 0,
        behavior: 'smooth'
      });
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
        var offset = target.getBoundingClientRect().top + window.scrollY;
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
  },

  getContentVisibilityHeight: function() {
    var docHeight = $('.container').height();
    var winHeight = $(window).height();
    var contentVisibilityHeight = docHeight > winHeight ? docHeight - winHeight : $(document).height() - winHeight;
    return contentVisibilityHeight;
  },

  getSidebarb2tHeight: function() {
    var sidebarb2tHeight = CONFIG.back2top && CONFIG.back2top_sidebar ? $('.back-to-top').height() : 0;
    return sidebarb2tHeight;
  },

  getSidebarSchemePadding: function() {
    var sidebarNavHeight = $('.sidebar-nav').css('display') === 'block' ? $('.sidebar-nav').outerHeight(true) : 0;
    var sidebarInner = $('.sidebar-inner');
    var sidebarPadding = sidebarInner.innerWidth() - sidebarInner.width();
    var sidebarOffset = CONFIG.sidebar.offset ? CONFIG.sidebar.offset : 12;
    var sidebarSchemePadding = (sidebarPadding * 2) + sidebarNavHeight + sidebarOffset + this.getSidebarb2tHeight();
    return sidebarSchemePadding;
  }
};

$(document).ready(function() {

  function wrapTable() {
    $('table').not('.gist table').wrap('<div class="table-container"></div>');
  }

  /**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
  function updateSidebarHeight(height) {
    height = height || 'auto';
    $('.site-overview, .post-toc').css('max-height', height);
  }

  function initSidebarDimension() {
    var updateSidebarHeightTimer;

    $(window).on('resize', function() {
      updateSidebarHeightTimer && clearTimeout(updateSidebarHeightTimer);

      updateSidebarHeightTimer = setTimeout(function() {
        var sidebarWrapperHeight = document.body.clientHeight - NexT.utils.getSidebarSchemePadding();

        updateSidebarHeight(sidebarWrapperHeight);
      }, 0);
    });

    // Initialize Sidebar & TOC Height.
    updateSidebarHeight(document.body.clientHeight - NexT.utils.getSidebarSchemePadding());
  }
  initSidebarDimension();
  wrapTable();
});
