'use strict';

const modalMain = document.querySelector('#modal_main');
const modalSuccess = document.querySelector('#modal_success');
const btns = document.querySelectorAll('.btn');
const modalClose = document.querySelectorAll('div.modal__close');

modalMain.classList.add('modal_active');

Array.from(modalClose).forEach( (el) => {
  el.addEventListener('click', () => {
    modalMain.classList.remove('modal_active');
    modalSuccess.classList.remove('modal_active');
  });
});

Array.from(btns).forEach( (btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    if( btn.classList.contains('btn_danger') ) {
      modalMain.classList.remove('modal_active');
      modalSuccess.classList.add('modal_active');
    } else {
      modalSuccess.classList.remove('modal_active');
    }    
  });
});
