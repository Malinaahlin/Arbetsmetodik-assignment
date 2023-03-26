import { ListValues } from './models/values';

let myArray: ListValues[] = [];

let firstTodo = new ListValues('Tvätta', false);
let secondTodo = new ListValues('Städa', false);
let thirdTodo = new ListValues('Diska', false);
myArray.push(firstTodo, secondTodo, thirdTodo);

let listContainer = document.createElement('div');
listContainer.className = 'listContainer';

printList();

function printList() {
  listContainer.innerHTML = '';

  for (let i = 0; i < myArray.length; i++) {
    let thisTodoItem = myArray[i];

    let arrayContainer = document.createElement('ul') as HTMLUListElement;
   
    let arrayList = document.createElement('li') as HTMLLIElement;
    arrayList.id = 'todos';
    arrayList.innerHTML = thisTodoItem.nameValue;

    let input = document.createElement('input') as HTMLInputElement;
    input.id = 'new-todo-input';
    let styling = arrayList;

    if (thisTodoItem.checkedValue === true) {
      styling.style.textDecoration = 'line-through';
      input.checked = true;
    } else {
      styling.style.textDecoration = 'none';
      thisTodoItem.checkedValue = false;
    }

    input.addEventListener('change', function check() {
      if (input.checked === true) {
        styling.style.textDecoration = 'line-through';
        thisTodoItem.checkedValue = true;
      } else {
        styling.style.textDecoration = 'none';
        thisTodoItem.checkedValue = false;
      }
    });

    input.setAttribute('type', 'checkbox');

    let deleteButton = document.createElement('button') as HTMLButtonElement;
    deleteButton.addEventListener('click', function remove() {
      myArray.splice(i, 1);
      printList();
    });
    deleteButton.className = 'delete';
    deleteButton.setAttribute('type', 'button');
    deleteButton.innerHTML = 'Radera';

    let btn = document.createElement('li') as HTMLLIElement;
    let deleteBtn = document.createElement('li');

    btn.appendChild(input);
    deleteBtn.appendChild(deleteButton);
    listContainer.appendChild(arrayContainer);
    arrayContainer.appendChild(arrayList);
    arrayContainer.appendChild(btn);
    arrayContainer.appendChild(deleteBtn);
  }
}

(document.getElementById('container') as HTMLDivElement).appendChild(listContainer);

(document.getElementById('todo-form') as HTMLFormElement).addEventListener('submit', addToList);
let newTodoInput = document.getElementById('new-todo-input') as HTMLInputElement;

function addToList(e) {
  e.preventDefault();
  let text = newTodoInput.value;
  if (text !== '') {
    let newItem = new ListValues(text, false);
    myArray.push(newItem);
    printList();
    newTodoInput.value = '';
  }
}

(document.getElementById('sortBtn') as HTMLButtonElement).addEventListener('click', sortList);

function sortList() {
  myArray.sort((a, b) => {
    if (a.nameValue > b.nameValue) return 1;
    if (a.nameValue < b.nameValue) return -1;
    return 0;
  });
  printList();
}
