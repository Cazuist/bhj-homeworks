'use strict';

const links = document.querySelectorAll('.menu__link');
const subMenus = document.querySelectorAll('.menu_sub');

Array.from(links).forEach( (link) => {
  if (link.nextElementSibling) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      Array.from(subMenus).forEach( (menu) => {
        menu.classList.remove('menu_active');
      });
      link.nextElementSibling.classList.add('menu_active');
    });
  };
});