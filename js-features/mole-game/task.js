'use strict';

const holes = document.querySelectorAll('.hole');
const dead = document.querySelector('#dead');
const lost = document.querySelector('#lost');

Array.from(holes).forEach( (hole) => hole.addEventListener('click', () => {
	if (hole.className.includes('hole_has-mole')) {
    ++dead.textContent;
    if(dead.textContent >= 10) {
      alert('Вы выиграли!');
      dead.textContent = 0;
      lost.textContent = 0;
    };
  } else {
    lost.textContent++;
    if(lost.textContent >= 5) {
      alert('Вы проиграли!');
      dead.textContent = 0;
      lost.textContent = 0;
      clearInterval();
    };
  }
}) );