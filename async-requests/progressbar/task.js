'use strict';
const form = document.querySelector('form');
const input = document.querySelector('input[name="file"]');
const button = document.querySelector('button');
const progress = document.querySelector('progress');

button.addEventListener('click', (event) => {
  event.preventDefault();
  if(input.files.length != 0) {
    const total = input.files[0].size;
    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    
    xhr.upload.onload = function() {
      setTimeout( () => {
        alert(`File ${input.files[0].name} размером ${total} байт успешно загружен!`);
      }, 100);      
    }

    xhr.upload.onprogress = function(event) {
      progress.value = `${event.loaded / total}`;
    };

    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    
    xhr.send(formData);
  }
});