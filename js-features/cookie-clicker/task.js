'use strict';

const clicker = document.querySelector('.clicker');
const clickAmount = document.querySelector('#clicker__counter');
const clickSpeed = document.querySelector('#clicker__speed');
const cookie = document.querySelector('#cookie');

(function () {
  let time = 0;

  return clicker.addEventListener('click', () => {
    if(clickAmount.textContent === 0) {
      time = Date.now();
    }

    ++clickAmount.textContent;
    if (clickAmount.textContent && clickAmount.textContent % 2) {
      cookie.width += 50;
    } else {
      cookie.width -= 50;
    }

    clickSpeed.textContent = ( 1000 / (Date.now() - time) ).toFixed(2);
    time = Date.now();  
  });
})();