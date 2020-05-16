class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerBox = container.querySelector('.timer');    
    this.timer = this.timerBox.querySelector('span');

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord(); 
    this.timerReload();
    
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keypress', (event) => {  
      const userSymbol = event.key.toLowerCase();
      const symb = this.currentSymbol.textContent.toLowerCase();
      if (userSymbol === symb) {
        this.success();        
      } else {
        this.fail();
      }      
    });
  }

  setTimer() {    
    this.timer.textContent = this.wordElement.textContent.length; ////
  }

  timerStart() {
    this.intId = setInterval( () => {      
      --this.timer.textContent;
      if (+this.timer.textContent <= 0) {
        this.fail();
      }      
    }, 1000);
  }

  timerStop() {
    clearInterval(this.intId);
  }

  timerReload() {
    this.timerStop();  
    this.setTimer();  
    this.timerStart(); 
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord(); 
    this.timerReload();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }

    this.setNewWord();
    this.timerReload();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript',
        'ultima ratio rayes',
        'имя',
        'фамилия'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'));