((document) => {
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
})(document);
