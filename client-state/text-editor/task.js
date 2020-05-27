'use strict';

const editor = document.querySelector('#editor');
const saveBtn = document.querySelector('.btn_save');
const resetBtn = document.querySelector('.btn_reset');

document.addEventListener('DOMContentLoaded', () =>{
  editor.value = localStorage.editor || '';
  editor.focus();
});

let intID;

editor.addEventListener('focus', () => {
	intID = setInterval( () => {
    addInStorage();
  }, 10000) 
});

editor.addEventListener('blur', () => {
  addInStorage();
  clearInterval(intID);
});

resetBtn.addEventListener('click', () => {
  editor.value = '';
  localStorage.removeItem('editor');
  editor.focus();
});

saveBtn.addEventListener('click', () => {
  addInStorage();
  editor.focus();
});


function addInStorage() {
  const string = editor.value;
  localStorage.editor = string;
}