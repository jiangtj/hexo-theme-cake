((d) => {
  let size = 14;
  let updateSpan = () => {
    d.querySelector('.font-size-ol-value').innerHTML = size;
  };
  d.querySelector('.font-size-ol-plus').addEventListener('click', () => {
    size++;
    d.querySelector('body').style.fontSize = size + 'px';
    updateSpan();
  });
  d.querySelector('.font-size-ol-sub').addEventListener('click', () => {
    size--;
    d.querySelector('body').style.fontSize = size + 'px';
    updateSpan();
  });
})(document);
