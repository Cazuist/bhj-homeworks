'use strict';
const main = document.querySelector('.interests_main');
const checkboxes = document.querySelectorAll('.interest__check');


Array.from(checkboxes).forEach( (checkbox) => {
  checkbox.addEventListener('change', (event) => {
    getInnerEl(checkbox).forEach( (el) => {
      el.checked = event.target.checked;
    })

    const hasParentLI = event.target.closest('UL').parentElement.nodeName != 'DIV';

    if (hasParentLI) {
      setCheckedStatus(event.target);
    }
  });
});

//вспомогательные функции
function getInnerEl(node) {
  const arr = [];
  const list = Array.from( node.closest('LI').querySelectorAll('li') );

  list.forEach( (item) => arr.push( (item.querySelector('input') )));
  return  arr;
}

function getOuterParents(node) {
  let arr = [];
  return (function pushToArray(node) {
    const parentUL = node.closest('ul');
    const testEl = parentUL.parentElement;
    const pushedInput = testEl.querySelector('input'); 

    if(testEl.nodeName != 'LI') {
      return arr;
    }
    
    arr.push(pushedInput);
    return pushToArray(pushedInput);
    })(node);  
}

function getBrothers(node) {
  const parent = node.closest('UL');
  const childrenUl = parent.children;
  const brotherInputs = Array.from(childrenUl)
        .map( (el) => el.querySelector('input') );
  return brotherInputs;
}

function checkedStatus(node) {
  let list = getBrothers(node);

  if ( list.every( (item) => item.checked === true ) ) {
    return true;
  } else if ( list.every( (item) => item.checked === false ) ) {
    return false;
  } else {
    return 'indeterminate';
  }
}

function setCheckedStatus(node) {
  const parentInput = node.closest('UL').parentElement.querySelector('input');
  const status = checkedStatus(node);  

  if (status != 'indeterminate') {
    parentInput.checked = status;
    parentInput.indeterminate = false;          
  } else {
    parentInput.indeterminate = true;
    getOuterParents(node).forEach( (el) => el.indeterminate = true );
  }
}