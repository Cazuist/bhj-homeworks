'use strict';

const chat = document.querySelector('.chat-widget');
const chatSide = document.querySelector('.chat-widget__side');
const messagesContainer = document.querySelector('.chat-widget__messages-container');
const messagesBox = document.querySelector('.chat-widget__messages');
const inputText = document.querySelector('.chat-widget__input');

const botMessages = [
  'Кто тут?',
  'Где ваша совесть?',
  'Мы ничего не будем вам продавать!',
  'К сожалению, все операторы сейчас заняты. Не пишите нам больше!',
  'Добрый день! До свидания!',
  'Вы не купили ни одного товара для того, чтобы так с нами разговаривать'
];

chatSide.addEventListener('click', () => {
  chat.classList.add('chat-widget_active');
  
  const intID2 = setTimeout( () => {
    if( Array.from(messagesBox).length === 0) {
      generateBotAnswer('И долго мне еще ждать??!');
    }
  }, 30000);
});

document.addEventListener('keypress', (event) => {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    showUserMessage();
    const intID = setTimeout( generateBotAnswer, randomInt(3) * 1000, 
               botMessages[randomInt(botMessages.length -1)] );      
    inputText.value = '';
  }
});

if (chat.classList.contains('chat-widget_active')) {

}

//Дополнительные функции
function showUserMessage() {
  if (inputText.value) {
    messagesBox.innerHTML += `
      <div class="message message_client">
        <div class="message__time">${getCurrentFormattedTime()}</div>
        <div class="message__text">
          ${inputText.value}
        </div>
      </div>
    `;
  }

  scrollWindow();
}

function generateBotAnswer(message) {
  messagesBox.innerHTML += `
    <div class="message">
      <div class="message__time">${getCurrentFormattedTime()}</div>
      <div class="message__text">
        ${message}
      </div>
    </div>
  `;

  scrollWindow();
}

function randomInt(max) {
  return Math.floor( Math.random() * (max + 1) );
}

function getCurrentFormattedTime() {
  const now =  new Date();
  const hours = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`;
  const minutes = now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`;
  return `${hours}:${minutes}`;
}

function scrollWindow() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}