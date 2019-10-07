/* global NexT, CONFIG */
// todo use sticky
// https://www.runoob.com/css/css-positioning.html#position-sticky

var Affix = {
  init: function(element, options) {
    this.options = Object.assign({
      offset: 0
    }, options);
    window.addEventListener('scroll', this.checkPosition.bind(this));
    window.addEventListener('click', this.checkPositionWithEventLoop.bind(this));
    window.matchMedia('(min-width: 992px)').addListener(event => {
      if (event.matches) {
        this.options = {
          offset: NexT.utils.getAffixParam()
        };
        this.checkPosition();
      }
    });
    this.element = element;
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;
    this.checkPosition();
  },
  getState: function(offsetTop) {
    let scrollTop = window.scrollY;
    if (offsetTop != null && this.affixed === 'top') return scrollTop < offsetTop ? 'top' : false;
    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
    return false;
  },
  getPinnedOffset: function() {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.element.classList.remove('affix-top', 'affix-bottom');
    this.element.classList.add('affix');
    return (this.pinnedOffset = this.element.getBoundingClientRect().top);
  },
  checkPositionWithEventLoop() {
    setTimeout(this.checkPosition.bind(this), 1);
  },
  checkPosition: function() {
    if (window.getComputedStyle(this.element).display === 'none') return;
    let offset = this.options.offset;
    let offsetTop = offset.top;
    let affix = this.getState(offsetTop);
    if (this.affixed !== affix) {
      if (this.unpin != null) this.element.style.top = '';
      let affixType = 'affix' + (affix ? '-' + affix : '');
      this.affixed = affix;
      this.element.classList.remove('affix', 'affix-top', 'affix-bottom');
      this.element.classList.add(affixType);
    }
  }
};

NexT.utils.getAffixParam = function() {
  const sidebarOffset = CONFIG.sidebar.offset || 12;
  let headerOffset = document.querySelector('.header-inner').offsetHeight + sidebarOffset + 10;
  document.querySelector('.sidebar').style.marginTop = headerOffset + 'px';
  return {
    top: headerOffset - sidebarOffset
  };
};

window.addEventListener('DOMContentLoaded', () => {
  Affix.init(document.querySelector('.sidebar-inner'), {
    offset: NexT.utils.getAffixParam()
  });
});
