import { ListValues } from "./models/values";

  
  let myArray = [];
  
  let firstTodo = new ListValues ("Tvätta", false);
  let secondTodo = new ListValues ("Städa", false);
  let thirdTodo = new ListValues ("Diska", false);
  myArray.push(firstTodo);
  myArray.push(secondTodo);
  myArray.push(thirdTodo);
  let listContainer = document.createElement("div");
  listContainer.className = "listContainer";
  
  printList();
  
  function printList() {
    listContainer.innerHTML = "";
  
    for (let i = 0; i < myArray.length; i++) {
      let thisTodoItem = myArray[i];
  
      let arrayContainer = document.createElement("ul");
    //   arrayContainer.className = "arrayContainer";      klass på UL
  

      let arrayList = document.createElement("li");
      arrayList.id = ("todos");
    // arrayList.className = "todos";
      arrayList.innerHTML = thisTodoItem.name;
  
      let input = document.createElement("input");
      input.id = "new-todo-input";
      let styling = arrayList;
    //   input.innerHTML = "Klar";
  
      if (thisTodoItem.checked === true) {
        styling.style.textDecoration = "line-through";
        input.checked = true;
      } else {
        styling.style.textDecoration = "none";
        thisTodoItem.checked = false;
      }
  
      input.addEventListener("change", function check() {
        if (input.checked === true) {
          styling.style.textDecoration = "line-through";
          thisTodoItem.checked = true;
        } else {
          styling.style.textDecoration = "none";
          thisTodoItem.checked = false;
        }
      });
  
      input.setAttribute("type", "checkbox");
  
      let deleteButton = document.createElement("button");
      deleteButton.addEventListener("click", function remove() {
        myArray.splice(i, 1);
        printList();
      });
      deleteButton.className = "delete";
      deleteButton.setAttribute("type", "button");
      deleteButton.innerHTML = "Radera";
  
      let btn = document.createElement("li");
    //   btn.innerHTML = "Klar";
      let deleteBtn = document.createElement("li");
  
      btn.appendChild(input);
      deleteBtn.appendChild(deleteButton);
     
  
      listContainer.appendChild(arrayContainer);
      arrayContainer.appendChild(arrayList);
      arrayContainer.appendChild(btn);
      arrayContainer.appendChild(deleteBtn);
    }
  }
  
  document.getElementById("container").appendChild(listContainer);
  
  document.getElementById("todo-form").addEventListener("submit", addToList);
  let newTodoInput = document.getElementById("new-todo-input");
  
  function addToList(e) {
    e.preventDefault();
    let text = newTodoInput.value;
    if (text !== "") {
      let newItem = new ListValues(text, false);
      myArray.push(newItem);
      printList();
      newTodoInput.value = "";
    }
  }
  
  document.getElementById("sortBtn").addEventListener("click", sortList);
  
  function sortList() {
    myArray.sort((a, b) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
    });
    printList();
  }