'use strict';

const links = document.querySelectorAll('.has-tooltip');
const tooltip = document.getElementsByClassName('tooltip');

const div = document.createElement('DIV');
div.className = 'tooltip';
document.body.prepend(div);



Array.from(links).forEach( (item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();    

    if (!tooltip[0].classList.contains('tooltip_active')) {
      tooltip[0].classList.add('tooltip_active');
    } else {
      if(tooltip[0].innerText === event.target.title) {
        tooltip[0].classList.remove('tooltip_active');
      }
    }

    tooltip[0].innerText = event.target.title;
    setPosition(event.target);
  });

  item.addEventListener('mouseout', (event) => {
    tooltip[0].classList.remove('tooltip_active');
  });
});

//Дополнительные функции
function setPosition(node) {
  const rect = node.getBoundingClientRect();

  const tooltipWidth = window.getComputedStyle(tooltip[0]).width;
  const tooltipHeigth = window.getComputedStyle(tooltip[0]).height;

  if(rect.top > parseInt(tooltipHeigth) + 20) {
    tooltip[0].style.top = `${rect.top - 30}px`;
    tooltip[0].style.left = `${rect.left}px`;
  } else {
    tooltip[0].style.top = `${rect.bottom + 5}px`;
    tooltip[0].style.left = `${rect.left}px`;
  }
}