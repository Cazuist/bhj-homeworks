'use strict';

const sliders = document.querySelectorAll('.slider__item');
const prevArrow = document.querySelector('.slider__arrow_prev');
const nextArrow = document.querySelector('.slider__arrow_next');
const sliderDots = document.querySelectorAll('.slider__dot');

sliderDots[0].classList.add('slider__dot_active');
let counter = 0;

nextArrow.addEventListener('click', function() {
  sliders[counter].classList.remove('slider__item_active');
  sliderDots[counter].classList.remove('slider__dot_active');
  ++counter;
  if(counter >= sliders.length) {
    counter = 0;
  }
	sliders[counter].classList.add('slider__item_active');
  sliderDots[counter].classList.add('slider__dot_active');
});

prevArrow.addEventListener('click', function() {
  sliders[counter].classList.remove('slider__item_active');
  sliderDots[counter].classList.remove('slider__dot_active');
  --counter;
  if(counter < 0) {
    counter = sliders.length - 1;
  }
  sliders[counter].classList.add('slider__item_active');
  sliderDots[counter].classList.add('slider__dot_active');
});

Array.from(sliderDots).forEach( (dot, index) => {
  dot.addEventListener('click', function() {    
    sliders[counter].classList.remove('slider__item_active');
    sliderDots[counter].classList.remove('slider__dot_active');
    counter = index;
    sliders[counter].classList.add('slider__item_active');
    dot.classList.add('slider__dot_active');    
  })
});