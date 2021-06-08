//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector("#filterTodo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", removeCheck);
filterOptions.addEventListener("click", filterTodo);
window.addEventListener('DOMContentLoaded',getTodos);

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
  //Add todo to LocalStorige
  saveLocalTodo(todoInput.value);
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
    todo.classList.add("fall");
    removeLocalTodo(todo)
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Chck Mark
  if (item.classList.contains("complete-btn")) {
    todo.classList.toggle("completed");
  }
}

//Filter

function filterTodo(e) {
  // we bring the todo list for filtering
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
          break;
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// save todo to local storage

function saveLocalTodo(todo) {
  // Chcking if we have todose inside our local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []; // we create an array if is not founded
  } else {
      // if the key founded we get  it as abject to push inside todos values 
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //we push inside todos key atodo value 
  todos.push(todo);
  // we set the todos key as string in the local storige 
  localStorage.setItem("todos", JSON.stringify(todos));
}


// we retreive the todos items which are saved inside the local storige to the html elements 
function getTodos(){

 let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []; // we create an array if is not founded
  } else {
      // if the key founded we get  it as abject to push inside todos values 
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // we get back the items 

  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
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
  })

}

// Remove Todo from local storage

function removeLocalTodo(todo){

    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = []; // we create an array if is not founded
    } else {
        // if the key founded we get  it as abject to push inside todos values 
      todos = JSON.parse(localStorage.getItem("todos"));
    }

  const todoIndex=  todo.children
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos", JSON.stringify(todos))
}