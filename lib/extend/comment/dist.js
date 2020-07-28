/* global localStorage document */
'use strict';
(document => {
  const commentButton = document.querySelectorAll('.comment-button');
  if (commentButton.length > 0) {
    commentButton.forEach(element => {
      const commentClass = element.classList[2];
      element.addEventListener('click', () => {
        commentButton.forEach(rmActive => rmActive.classList.remove('active'));
        element.classList.add('active');
        document.querySelectorAll('.comment-body').forEach(rmActive => rmActive.classList.remove('active'));
        document.querySelector(`.comment-body.${commentClass}`).classList.add('active');
        localStorage.setItem('comments_active', commentClass);
      });
    });
    const activeClass = localStorage.getItem('comments_active') || commentButton[0].classList[2];
    const activeButton = document.querySelector(`.comment-button.${activeClass}`);
    if (activeButton) {
      activeButton.click();
    }
  }
})(document);
