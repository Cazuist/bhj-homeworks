'use strict';

const cartBox = document.querySelector('.cart');
const cart = document.querySelector('.cart__products');
const cartList = document.getElementsByClassName('cart__product');

const control = document.querySelectorAll('.product__quantity-control');
const addBtns = document.querySelectorAll('.product__add');


document.addEventListener('DOMContentLoaded', () => {
  cart.innerHTML = localStorage.getItem('cartList');
  checkCart();
});

Array.from(control).forEach( (item) => {
  item.addEventListener('click', () => {
    if (item.innerText == '+') {
      ++item.previousElementSibling.innerText;
    } if (item.innerText == '-') {
      if (item.nextElementSibling.innerText > 0) {
        --item.nextElementSibling.innerText;
      }
    }
  });
});

Array.from(addBtns).forEach( (btn) => {
  btn.addEventListener('click', (event) => {

    if ( isAbleToAdd(btn) ) {
      createCartElement(btn);
      checkCart();
    } else {
      addQuantity(btn);
      makeAnimation(createCopy(btn));
    }
     
  });
});

//Вспомогательные функции
function createCartElement(btnNode) {
  const parent = btnNode.closest('.product');
  const src = parent.querySelector('img').src;
  const quantity = parent.querySelector('.product__quantity-value').innerText;

  const div = document.createElement('DIV');
  
  div.className = 'cart__product';
  div.dataset.id = parent.dataset.id;  


  div.innerHTML = `
    <img class="cart__product-image" src="${src}">
    <div class="cart__product-count">${quantity}</div>
    <div class="cart__product-delete" onclick="${removeProduct()}">X</div>
  `;

  cart.append(div);
  addInStorage();
}

function removeProduct() {
  return 'this.parentElement.remove(); checkCart(); addInStorage()';
}

function isAbleToAdd(btnNode) {
  const parent = btnNode.closest('.product');
  
  if (cartList.length === 0) {
    return true;
  } 

  return !Array.from(cartList).some( (item) => item.dataset.id == parent.dataset.id);    
}

function checkCart() {
  if(cart.children.length != 0) {
    cartBox.classList.add('cart_active');
  } else {
    cartBox.classList.remove('cart_active');
  }
}

function addQuantity(btnNode) {
  const parent = btnNode.closest('.product');
  const quantityToAdd = +parent.querySelector('.product__quantity-value').innerText;
  let quantBox = Array.from(cartList).find( (item) => item.dataset.id == parent.dataset.id)
                  .querySelector('.cart__product-count');

  let currentQuantity = +quantBox.innerText;

  quantBox.innerText = currentQuantity + quantityToAdd;
  addInStorage();  
}

function createCopy(btnNode) {
  const parent = btnNode.closest('.product');
  const id = parent.dataset.id;
  const rect = parent.getBoundingClientRect();

  const product = Array.from(cartList).find( (item) => item.dataset.id === id);

  const productCopy = product.cloneNode(true);
  productCopy.querySelector('.cart__product-count').remove();
  productCopy.querySelector('.cart__product-delete').remove();

  productCopy.classList.add('product__copy');
  productCopy.style.position = 'absolute';
  productCopy.style.left = `${rect.left}px`;
  productCopy.style.top = `${rect.top + 50}px`;

  cart.append(productCopy);

  return productCopy;
}

function makeAnimation(node) {
  const id = node.dataset.id;
  const rectFrom = node.getBoundingClientRect();
  const rectTo = Array.from(cartList).find( (item) => item.dataset.id === id)
                .getBoundingClientRect();

  const topFrom = rectFrom.top;
  const leftFrom = rectFrom.left;
  const topTo = rectTo.top;
  const leftTo = rectTo.left;

  const topStep = topTo - topFrom;
  const leftStep = leftTo - leftFrom;
  const delay = 100;

  node.style.transform = `translate(${leftStep}px, ${topStep}px)`;
  node.style.trasitionProperty = 'transform';
  node.style.transitionDuration = `${delay}ms`;

  setTimeout( () => node.remove() ,delay);
}

function addInStorage() {
  const cartHTMLContent = cart.innerHTML;
  localStorage.setItem('cartList', cartHTMLContent);
}

//localStorage.removeItem('cartList');