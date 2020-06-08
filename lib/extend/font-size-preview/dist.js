((d) => {
  let size = localStorage.getItem('font_size_value') || 14;
  let updateSize = () => {
    d.querySelector('body').style.fontSize = size + 'px';
    d.querySelector('.font-size-ol-value').innerHTML = size;
    localStorage.setItem('font_size_value', size);
  };
  if (size !== 14) {
    updateSize();
  }
  d.querySelector('.font-size-ol-plus').addEventListener('click', () => {
    size++;
    updateSize();
  });
  d.querySelector('.font-size-ol-sub').addEventListener('click', () => {
    size--;
    updateSize();
  });
})(document);
