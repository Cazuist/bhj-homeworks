'use strict';
const rotator = document.querySelector('.rotator');

const rotatorCase = Array.from(rotator.children);
let index = rotatorCase.findIndex( (el) => el.classList.contains('rotator__case_active'));
const startDelay = rotatorCase[index].dataset.speed;

rotatorCase[index].style.color = rotatorCase[index].dataset.color;

let timerId = setTimeout(function change() {
  rotatorCase[index].classList.remove('rotator__case_active');
  if (index < rotatorCase.length - 1) {
    ++index;
  } else {
    index = 0;
  }
  let delay = rotatorCase[index].dataset.speed;

  rotatorCase[index].classList.add('rotator__case_active');
  rotatorCase[index].style.color = rotatorCase[index].dataset.color;

  timerId = setTimeout(change, delay);
}, startDelay);