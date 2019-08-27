/* global NexT, CONFIG */

$(document).ready(function() {

  $(document).trigger('bootstrap:before');

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

  // sidebar nav
  var TAB_ANIMATE_DURATION = 200;
  $('.sidebar-nav li').on('click', event => {
    var item = $(event.currentTarget);
    var activeTabClassName = 'sidebar-nav-active';
    var activePanelClassName = 'sidebar-panel-active';
    if (item.hasClass(activeTabClassName)) return;

    var target = $('.' + item.data('target'));
    var currentTarget = target.siblings('.sidebar-panel');
    currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, () => {
      currentTarget.hide();
      target
        .stop()
        .css({ 'opacity': 0, 'display': 'block' })
        .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, () => {
          // Prevent adding TOC to Overview if Overview was selected when close & open sidebar.
          currentTarget.removeClass(activePanelClassName, 'motion-element');
          target.addClass(activePanelClassName, 'motion-element');
        });
    });

    item.siblings().removeClass(activeTabClassName);
    item.addClass(activeTabClassName);
  });

  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'layout/_partials/head.swig' file.
   */
  CONFIG.copycode.enable && NexT.utils.registerCopyCode();
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
