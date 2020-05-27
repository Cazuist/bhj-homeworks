'use strict';

const signin = document.querySelector('.signin');
const loginBtn = document.querySelector('#signin__btn');
const logoutBtn = document.querySelector('#signout__btn');

const form = document.querySelector('#signin__form');
const loginInput = document.querySelector('input[name=login]');
const passInput = document.querySelector('input[name=password]');
const welcome = document.querySelector('.welcome');
const userId = document.querySelector('#user_id');

const URL = 'https://netology-slow-rest.herokuapp.com/auth.php';

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.user) {
    welcome.classList.add('welcome_active');
    userId.innerText = JSON.parse(localStorage.user).id;
  } else {
    signin.classList.add('signin_active');
  }
});

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
  const fd = new FormData(form);
  
  const xhr = new XMLHttpRequest();
  xhr.open('POST', URL, );
  xhr.send( fd );

  xhr.onload = function() {
    const response = JSON.parse(xhr.response);

    if(!response.success) {
      alert('Неверный логин / пароль!');
    } else {
      const id = response.user_id;
      userId.innerText = id;
      localStorage.user = JSON.stringify({id});

      signin.classList.remove('signin_active');
      welcome.classList.add('welcome_active');
    }
  };  

  form.reset();
});

logoutBtn.addEventListener('click', () => {
  welcome.classList.remove('welcome_active');
  signin.classList.add('signin_active');
  delete localStorage.user;
});
