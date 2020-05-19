'use strict';

const book = document.querySelector('.book');
const control = document.querySelector('.book__controls');

const bookClasses = {
  default: book.className,
  fontSize: '',
  color: '',
  background: '',
};

control.addEventListener('click', (event) => {
  if(event.target.matches('a')) {
    event.preventDefault();
    switchClass(event.target);
  }
});

function switchClass(target) {
  const parent = target.parentElement;
  const nodes = target.parentElement.children;
  const nodesArr = Array.from(nodes);
  const classes = target.classList;

  if( classes.contains('font-size') ) {
    nodesArr.find( (el) => el.classList.contains('font-size_active') )
            .classList.remove('font-size_active');
    classes.add('font-size_active');
  } else if( classes.contains('color') ) {
    nodesArr.find( (el) => el.classList.contains('color_active') )
            .classList.remove('color_active');
    classes.add('color_active');
  }
  
  if( parent.className.includes('font-size') ) {      
    bookClasses.fontSize = `book_fs-${target.dataset.size}`;
  } else if( parent.className.includes('color') ) {
    bookClasses.color = `book_color-${target.dataset.color}`;
  } else if( parent.className.includes('background') ) {
    bookClasses.background = `book_bg-${target.dataset.color}`;
  }

  book.className = Object.values(bookClasses).reduce( (start, current) => start + ' ' + current );
}
