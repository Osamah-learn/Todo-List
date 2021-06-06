//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", removeCheck);
//Functions
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();
  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  //Check Mark button
  const completeButton = document.createElement("BUTTON");
  completeButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  //trash Button
  const trashButton = document.createElement("BUTTON");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //insert todo Div inside todoList
  todoList.appendChild(todoDiv);
  //clear todoInput Value
  todoInput.value = "";
}

// RemoveCheck
function removeCheck(e) {
    //we target the element 
  const item = e.target;
 // we target the parent of the element to delete it 
  const todo = item.parentElement;
  //condition if item class list has class trash-btn and if its has then whene we click it it gonna remove all element
  if (item.classList.contains("trash-btn")) {
    todo.remove();
  }

  //Chck Mark
  if (item.classList.contains("complete-btn")){
      todo.classList.toggle("Completed");
  }
}
