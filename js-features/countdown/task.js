'use strict';

const timer = document.querySelector('#timer');
let timerStart = timer.textContent;
timer.textContent = `00:00:${timerStart}`;

let intervalId = setInterval( () => {
  if (timerStart > 0) {
    timerStart -= 1;
    timer.textContent = `00:00:${timerStart < 10 ? `0${timerStart}` : timerStart}`;
  } else {
    clearInterval(intervalId);
    //alert('Вы победили в конкурсе!'); // Вариант с Alert
    //location = 'https://developer.mozilla.org/ru/docs/Web/API/Window/location';  // Вариант с Location
    
    makeLink(); //Вариант с созданием и переходом по ссылке
    clickLink();
  }  
}, 1000);

function makeLink() {
  const body = document.querySelector('body');
  body.innerHTML = '<a href="https://developer.mozilla.org/ru/docs/Web/API/Window/location" download target="_blank">Link</a>';
}

function clickLink() {
  const link = document.querySelector('a');
  link.click();
}