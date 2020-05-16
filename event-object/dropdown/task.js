'use strict';

const dropDown = document.querySelectorAll('.dropdown');
const dropList = document.querySelectorAll('.dropdown__list');

Array.from(dropDown).forEach( (elem, index) => {
  elem.addEventListener('click', (event) => {
    event.preventDefault();
    
    Array.from(dropList).forEach( (item, idx) => {
      if (idx != index) {
        item.classList.remove('dropdown__list_active');
      }      
    });

    elem.lastElementChild.classList.toggle('dropdown__list_active');
    event.currentTarget.firstElementChild.textContent = event.target.textContent;    
  });
});
