'use strict';

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');

document.addEventListener('DOMContentLoaded', () => {
	if( getCookie('modalStatus') != 'Off' ) {
    modal.classList.add('modal_active');
  } else {
    modal.classList.remove('modal_active');
  }
});

modalClose.addEventListener('click', () => {
	modal.classList.remove('modal_active');
	document.cookie = 'modalStatus=Off';  
});

const getCookie = (name) => {
  const value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts
        .pop()
        .split(";")
        .shift();
  }
}