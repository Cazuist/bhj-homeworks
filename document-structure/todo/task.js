'use strict';

const input = document.querySelector('.tasks__input');
const list = document.querySelector('.tasks__list');
const button = document.querySelector('.tasks__add');

document.addEventListener('DOMContentLoaded', () => {
  list.innerHTML = localStorage.getItem('todoList');
});

button.addEventListener('click', (event) => {  
  event.preventDefault();

  if ( input.value.trim() ) {
    createTask();
  }  
});

document.addEventListener('keypress', (event) => {  
  if (event.keyCode === 'Enter') {
    if ( input.value.trim() ) {
      createTask();
    } 
  }
});

//Вспомогательные функции
function createTask() {
  const div = document.createElement('DIV');    

  div.innerHTML = `
  <div class="task">
    <div class="task__title">
      ${input.value}
    </div>
    <a href="#" class="task__remove" onclick="this.parentElement.remove(); addInStorage();">&times;</a>
  </div>
`;

  list.append(div);
  input.value = '';

  addInStorage();
}

function addInStorage() {
  const taskHTMLContent = list.innerHTML;
  localStorage.setItem('todoList', taskHTMLContent);
}

//localStorage.removeItem('todoList');