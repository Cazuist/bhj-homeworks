'use strict';

const loader = document.querySelector('.loader');
const items = document.querySelector('#items');

document.addEventListener('DOMContentLoaded', () => {
  const storage = localStorage.getItem('currencyList');
  if(storage) {
    fillBox(createBox(storage));
  }
}); 

/// ------------------------ fetch
fetch('https://netology-slow-rest.herokuapp.com')
        .then( response => response.text())
        .then( response => {
          loader.classList.remove('loader_active');
          items.innerHTML = '';
          addInStorage(response);
          fillBox(createBox(response));
        })
        .catch( (error) => {
          showErrorBox();
        });


/// -----------------------XMLHttpRequest
/*const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://netology-slow-rest.herokuapp.com');

xhr.send();

xhr.onload = function() {
  loader.classList.remove('loader_active');
  items.innerHTML = '';
  addInStorage(xhr.response);
  fillBox(createBox(xhr.response));
};

xhr.onerror = function() {
  showErrorBox();
};*/

function createBox(data) {
  const list = parseJSON(data);
  let fragment = new DocumentFragment();

  for(let curr in list) {
    const div = document.createElement('DIV');
    div.className = 'item';

    div.innerHTML = `
      <div class="item__code">
          ${list[curr].CharCode}
      </div>
      <div class="item__value">
          ${list[curr].Value}
      </div>
      <div class="item__currency">
          руб.
      </div>
    `;
    fragment.append(div);
  }

  return fragment;
}

function fillBox(result) {
  items.append(result);  
}

function parseJSON(data) {
  const json = JSON.parse(data);
  const currencyList = json.response.Valute;
  return currencyList;
}

function showErrorBox() {
  const div = document.createElement('DIV');
  div.innerText = 'Произошла ошибка при загрузке данных! Перезагрузите страницу.';
  div.style.color = 'violet';
  div.style.fontWeight = '700';
  div.style.width = '300px';
  div.style.height = '50px';
  div.style.backgroundColor = 'orangered';

  items.prepend(div);
  loader.classList.remove('loader_active');
}

function addInStorage(response) {
  localStorage.setItem('currencyList', response);
}

//localStorage.removeItem('currencyList');