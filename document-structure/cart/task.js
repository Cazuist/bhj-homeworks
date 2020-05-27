'use strict';

const cartBox = document.querySelector('.cart');
const cart = document.querySelector('.cart__products');
const cartList = document.getElementsByClassName('cart__product');

const control = document.querySelectorAll('.product__quantity-control');
const addBtns = document.querySelectorAll('.product__add');


document.addEventListener('DOMContentLoaded', () => {
  createCartFromStorage();
  toogleCartVisibility();
});

Array.from(control).forEach( (item) => {
  item.addEventListener('click', () => {
    const btn = item.parentElement.nextElementSibling; 

    if (item.innerText == '+') {
      ++item.previousElementSibling.innerText;
      btn.classList.remove('btn_disabled');
    } else {
      if (item.nextElementSibling.innerText > 0) {
        item.nextElementSibling.innerText--;
        if(item.nextElementSibling.innerText == 0) {
          btn.classList.add('btn_disabled');
        }        
      } 
    }
  });
});

Array.from(addBtns).forEach( (btn) => {
  btn.addEventListener('click', (event) => {

    if ( isAbleToAdd(btn) ) {
      createCartElement(btn);
      toogleCartVisibility();
    } else {
      addQuantity(btn);      
    }

    makeAnimation(createCopy(btn));     
  });
});

//Вспомогательные функции
function createCartElement(btnNode) {
  if(btnNode.classList.contains('btn_disabled')) {
    return;
  }

  const parent = btnNode.closest('.product');
  const src = parent.querySelector('img').src;
  const quantity = parent.querySelector('.product__quantity-value').innerText;
  const div = document.createElement('DIV');
  
  div.className = 'cart__product';
  div.dataset.id = parent.dataset.id;  


  div.innerHTML = `
    <img class="cart__product-image" src="${src}">
    <div class="cart__product-count">${quantity}</div>
    <div class="cart__product-delete">X</div>
  `;

  div.querySelector('.cart__product-delete').addEventListener('click', (event) => {
    event.target.parentElement.remove();
    toogleCartVisibility();
    addInStorage();
  });

  cart.append(div);
  addInStorage();
}

function createCartFromStorage() {
  const storage = localStorage.getItem('cartList');

  if(storage) {
    const products = JSON.parse( localStorage.getItem('cartList') );
    const fragment = new DocumentFragment();

    for (let key in products) {
      const div = document.createElement('DIV');
      div.className = 'cart__product';
      div.dataset.id = products[key]['id'];

      div.innerHTML = `
        <img class="cart__product-image" src="${products[key]['src']}">
        <div class="cart__product-count">${products[key]['quantity']}</div>
        <div class="cart__product-delete">X</div>
      `;

      div.querySelector('.cart__product-delete').addEventListener('click', (event) => {
        event.target.parentElement.remove();
        toogleCartVisibility();
        addInStorage();
      });

      fragment.append(div);
    }     

    cart.append(fragment);
  }  
}

function isAbleToAdd(btnNode) {
  const parent = btnNode.closest('.product');
  
  if (cartList.length === 0 ) {
    localStorage.removeItem('cartList');
    return true;
  } 

  return !Array.from(cartList).some( (item) => item.dataset.id == parent.dataset.id);    
}

function toogleCartVisibility() {
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
  if(btnNode.classList.contains('btn_disabled')) {
    return;
  }

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
  if(!node) {
    return;
  }

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
  const products = cart.children;
  const storage = {}

  Array.from(products).forEach( (product, index) => {
    const id = product.dataset.id;
    const src = product.firstElementChild.src;
    const quantity = product.firstElementChild.nextElementSibling.innerText;
    storage[index] = {id, src, quantity};    
  });  
  
  localStorage.setItem('cartList', JSON.stringify(storage));
}

//localStorage.removeItem('cartList');