'use strict';

const input = document.querySelector('.tasks__input');
const list = document.querySelector('.tasks__list');
const button = document.querySelector('.tasks__add');

document.addEventListener('DOMContentLoaded', () => {
  createTaskFromStorage();
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
function createHTML(text) {
  const div = document.createElement('DIV');    

  div.innerHTML = `
    <div class="task">
      <div class="task__title">
        ${text}
      </div>
      <a href="#" class="task__remove";">&times;</a>
    </div>
  `;
  
  div.querySelector('a').addEventListener('click', (event) => {
    event.target.parentElement.remove();
    addInStorage();
  });

  list.append(div);
}


function createTask() {
  createHTML(input.value);  
  addInStorage();

  input.value = '';
}

function createTaskFromStorage() {
  const storage = localStorage.getItem('todoList'); 

  if(storage) {
    storage.split(';').forEach( (item) => {    
      createHTML(item);
    });

    addInStorage();
  }  
}

function addInStorage() {
  const tasksList = list.querySelectorAll('.task__title');
  
  let string = '';

  Array.from(tasksList).forEach( (item, index, array) => {
    if (index === array.length - 1) {
      string += `${item.innerText}`;
    } else {
      string += `${item.innerText};`
    }    
  });  
  
  if(string) {
    localStorage.setItem('todoList', string);
  } else {
    localStorage.removeItem('todoList');
  }  
}

//localStorage.removeItem('todoList');