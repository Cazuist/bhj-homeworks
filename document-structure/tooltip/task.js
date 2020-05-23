'use strict';

const links = document.querySelectorAll('.has-tooltip');

for (let link of links) {
  const div = document.createElement('DIV');    
  div.dataset.position = 'bottom';
  div.className = 'tooltip';
  div.innerText = link.title;

  link.after(div);
}

const tooltips = document.querySelectorAll('.tooltip');

Array.from(links).forEach( (item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();

    Array.from(tooltips).forEach( (node, idx) => {
      if(index === idx) {
        setPosition(node);
        node.classList.toggle('tooltip_active');
      } else {
        node.classList.remove('tooltip_active');
      }
    });
  });
});

document.addEventListener('scroll', () => {
  Array.from(tooltips).forEach( (node) => {
    node.classList.remove('tooltip_active');
  });
});

window.addEventListener('resize', () => {
  Array.from(tooltips).forEach( (node) => {
    node.classList.remove('tooltip_active');
  });
});

//Дополнительные функции
function setPosition(node) {
  const prevElem = node.previousElementSibling;
  const rect = prevElem.getBoundingClientRect();

  node.style.left = `${rect.left}px`;

  if (node.dataset.position === 'top') {
    node.style.top = `${rect.top - 10}px`;
    
  } else if (node.dataset.position === 'bottom') {
    node.style.top = `${rect.bottom + 5}px`;
  } 
}