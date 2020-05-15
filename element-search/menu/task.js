'use strict';

const links = document.querySelectorAll('.menu__link');
const subMenus = document.querySelectorAll('.menu_sub');

Array.from(links).forEach( (link) => {
  let elem = link.nextElementSibling;
  if (elem) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      
      if(!elem.classList.contains('menu_active')) {
        Array.from(subMenus).forEach( (menu) => {
          menu.classList.remove('menu_active');
        });
        elem.classList.add('menu_active');        
      } else {
        elem.classList.remove('menu_active');
      }
    });    
  };
});