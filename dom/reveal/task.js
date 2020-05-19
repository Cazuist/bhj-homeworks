'use strict';

const reveal = document.querySelectorAll('.reveal');

window.addEventListener ('scroll', () => {
  Array.from(reveal).forEach( (el) => {
    toggleVisibility(el);
  });  
});

function toggleVisibility(el) {
  const elTop = el.getBoundingClientRect().top;
  const elBottom = el.getBoundingClientRect().bottom;
  const winHeight = window.innerHeight;

  if(elBottom > 0 && elTop < winHeight) {
    el.classList.add('reveal_active');
  } else {
    el.classList.remove('reveal_active');
  }
}