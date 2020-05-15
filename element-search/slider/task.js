'use strict';

const sliders = document.querySelectorAll('.slider__item');
const prevArrow = document.querySelector('.slider__arrow_prev');
const nextArrow = document.querySelector('.slider__arrow_next');
const sliderDots = document.querySelectorAll('.slider__dot');

sliderDots[0].classList.add('slider__dot_active');
let counter = 0;

nextArrow.addEventListener('click', function() {
  swithProcessing(counter, 'remove', sliders, sliderDots);
  ++counter;
  if(counter >= sliders.length) {
    counter = 0;
  }
  swithProcessing(counter, 'add', sliders, sliderDots);	
});

prevArrow.addEventListener('click', function() {
  swithProcessing(counter, 'remove', sliders, sliderDots);  
  --counter;
  if(counter < 0) {
    counter = sliders.length - 1;
  }
  swithProcessing(counter, 'add', sliders, sliderDots);
});

Array.from(sliderDots).forEach( (dot, index) => {
  dot.addEventListener('click', function() {    
    swithProcessing(counter, 'remove', sliders, sliderDots);
    counter = index;
    swithProcessing(counter, 'add', sliders);
    dot.classList.add('slider__dot_active');    
  })
});

function swithProcessing(index, classProp, ...elements) {
  elements.forEach( (el) => {
    if(el[index].classList.contains('slider__item')) {
      el[index].classList[classProp]('slider__item_active');
    } else {
      el[index].classList[classProp]('slider__dot_active');
    }  
  });
}