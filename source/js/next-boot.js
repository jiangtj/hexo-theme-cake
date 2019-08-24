/* global NexT, CONFIG */

$(document).ready(function() {

  $(document).trigger('bootstrap:before');

  NexT.utils.registerESCKeyEvent();

  CONFIG.back2top && NexT.utils.registerBackToTop();

  // Mobile top menu bar.
  $('.site-nav-toggle button').on('click', function() {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';

    $siteNav.stop()[animateAction]('fast', function() {
      $siteNav[animateCallback](ON_CLASS_NAME);
    });
  });

  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'layout/_partials/head.swig' file.
   */
  CONFIG.tabs && NexT.utils.registerTabsTag();
  NexT.utils.registerActiveMenuItem();
  NexT.utils.registerSidebarTOC();

  $(document).trigger('bootstrap:after');
});

// scroll
window.addEventListener('DOMContentLoaded', () => {
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
});
