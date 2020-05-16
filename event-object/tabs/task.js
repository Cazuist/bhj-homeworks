'use strict';

const tabs = document.querySelector('.tab__navigation');
const contents = document.querySelector('.tab__contents');

Array.from(tabs.children).forEach( (tab, index) => {
  tab.addEventListener('click', () => {
    clearClass(tabs, 'tab_active');
    clearClass(contents, 'tab__content_active');

    tab.classList.add('tab_active');
    contents.children[index].classList.add('tab__content_active');
  });
}); 

function clearClass(elem, className) {
  Array.from(elem.children).forEach( (el) => {
    el.classList.remove(className);
  });
}