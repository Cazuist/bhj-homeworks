'use strict';

const sliders = document.querySelectorAll('.slider__item');
const prevArrow = document.querySelector('.slider__arrow_prev');
const nextArrow = document.querySelector('.slider__arrow_next');
const sliderDots = document.querySelectorAll('.slider__dot');

sliderDots[0].classList.add('slider__dot_active');
let counter = 0;

nextArrow.addEventListener('click', function(event) {
  ++counter;
  if(counter >= sliders.length) {
    counter = 0;
  }
  switchProcessing(counter);
});

prevArrow.addEventListener('click', function(event) {
  --counter;
  if(counter < 0) {
    counter = sliders.length - 1;
  }
  switchProcessing(counter);
});

Array.from(sliderDots).forEach( (dot, index) => {
  dot.addEventListener('click', function() {    
    counter = index;
    switchProcessing(index);  
  })
});

function switchProcessing(index) {
  let slide = Array.from(sliders).find( (slide) => {
    return slide.classList.contains('slider__item_active')
  }).classList.remove('slider__item_active');
  
  let dot = Array.from(sliderDots).find( (dot) => {
    return dot.classList.contains('slider__dot_active')
  }).classList.remove('slider__dot_active');

  sliders[index].classList.add('slider__item_active');
  sliderDots[index].classList.add('slider__dot_active');
}