'use strict';

const title = document.querySelector('.poll__title');
const pollAnswers = document.querySelector('.poll__answers');

const xhr = new XMLHttpRequest();

xhr.open('GET', ' https://netology-slow-rest.herokuapp.com/poll.php');

xhr.send();

xhr.onload = function() {
  title.innerText = JSON.parse(xhr.response).data.title;
  pollAnswers.append(createButtons());
}

//Вспомогательные функции
function createButtons() {  
  const response = JSON.parse(xhr.response);
  const answers = response.data.answers;
  const id = response.id;
  const fragment = new DocumentFragment();

  answers.forEach( (answer, index, arr) => {
    const button = document.createElement('BUTTON');

    button.dataset.pollNum = `${id}`;
    button.className = 'poll__answer';
    button.innerText = arr[index];
    button.style.marginRight = '10px';

    button.addEventListener('click', (event) => {
      event.target.style.backgroundColor = 'lightblue';
      event.target.style.color = 'white';
      event.target.style.fontWeight = '700';
      setTimeout(() => alert('Спасибо, ваш ответ принят!'), 100);
      
      const xhr1 = new XMLHttpRequest();
      
      xhr1.open( 'POST', 'https://netology-slow-rest.herokuapp.com/poll.php' );
      xhr1.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
      xhr1.send( `vote=${id}&answer=${index}` );

      xhr1.onload = function() {
        createStat(xhr1.response);
      } 
    });

    fragment.append(button);
  });

  return fragment;
}

function createStat(response) {
  const stat = JSON.parse(response).stat;
  const fragment = new DocumentFragment();
  
  const totalAnswers = stat.reduce( (prev, item) => {
    return prev + item.votes;
  }, 0);
  
  stat.forEach( (item) => {
    const p = document.createElement('P');

    p.innerHTML = `
      ${item.answer}: <span><b>${( (item.votes / totalAnswers) * 100 ).toFixed(2)}%.</b></span>
    `;

    fragment.append(p);
  });

  pollAnswers.innerHTML = '';
  pollAnswers.append(fragment);
}