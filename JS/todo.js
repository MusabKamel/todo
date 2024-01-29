const htmlElement = document.getElementById("html");
const darkImgElement = document.getElementById("dark");
const listTodoElement = document.getElementById("drop_meu");
const newTodoInputElement = document.getElementById("input");
const formElement = document.getElementById("form");
const newTodoElement = document.getElementById("tod's");
const circleElement = document.getElementsByClassName("circle");
const errorInputElement = document.getElementById("error");
const showAllCompleteElement = document.getElementById("AllComplete");
const allTodoElement = document.getElementById("All");
const nowTodoElement = document.querySelector(".no_todo");
const InCompleteTodoElement = document.getElementById("InComplete");
const CounterElement = document.getElementById("Counter");

darkImgElement.onclick = function (e) {
  htmlElement.classList.toggle("dark");
};

let databases = [];

function addId() {
  let id = Math.random();
  return id;
}

function createTodo(name) {
  let todo = new Object();
  todo.name = name;
  todo.Complete = false;
  todo.id = addId();
  databases.push(todo);
  CounterElement.innerHTML = databases.length;
  return todo;
}

function verificationNewTodo() {
  if (newTodoInputElement.value == "") {
    return { valid: false, error: "is Empty" };
  }
  if (!/^[A-Za-z0-9]*$/.test(newTodoInputElement.value)) {
    return { valid: false, error: "Letters or Numbers only" };
  }
  if (newTodoInputElement.value.length <= 2) {
    return { valid: false, error: "The length must be increased" };
  } else {
    return { valid: true };
  }
}

function createTodoElement(todo) {
  const divNewTodo = document.createElement("div");
  const divCircle = document.createElement("div");
  const p = document.createElement("p");
  p.classList.add("add");
  const deleteIcon = document.createElement("i");
  divNewTodo.appendChild(divCircle);
  divNewTodo.appendChild(p);
  divNewTodo.appendChild(deleteIcon);
  deleteIcon.classList.add("fa-regular");
  deleteIcon.classList.add("fa-trash-can");
  deleteIcon.classList.add("icon");
  divNewTodo.classList.add("nwe_todo");
  divCircle.classList.add("circle");
  p.innerHTML = todo.name;
  newTodoElement.appendChild(divNewTodo);
  divNewTodo.setAttribute("id", todo.id);
  nowTodoElement.classList.add("none");
  // event
  divCircle.onclick = addCompletePage;
  deleteIcon.onclick = deleteTodoPage;
  console.log(databases);
}

let addCompletePage = function (e) {
  completeTodo(e.target.parentNode.id);
  e.target.classList.toggle("check");
  e.target.parentNode.children[1].classList.toggle("Line_middle");
  if (e.target.parentNode.firstChild.className != "circle check") {
    IncompletenessTodo(todo.id);
  }
};

let deleteTodoPage = function (e) {
  deleteTodo(e.target.parentNode.id);
  e.target.parentNode.remove();
  if (databases.length == 0) {
    nowTodoElement.classList.remove("none");
  }
};

formElement.onsubmit = function (event) {
  event.preventDefault();
  let validation = verificationNewTodo();
  if (validation.valid == true) {
    errorInputElement.innerHTML = "";
    createTodoElement(createTodo(newTodoInputElement.value));
    newTodoInputElement.value = "";
  } else {
    errorInputElement.innerHTML = validation.error;
  }
};

function completeTodo(id) {
  let Complete = databases.find((task) => task.id == id);
  Complete.Complete = true;
  return Complete;
}

function IncompletenessTodo(id) {
  let inComplete = databases.find((task) => task.id == id);
  inComplete.Complete = false;
  return inComplete;
}

function deleteTodo(id) {
  let Complete = databases.find((task) => task.id == id);
  let index = databases.indexOf(Complete);
  CounterElement.innerHTML = databases.length - 1;
  databases.splice(index, 1);
}

function getAllCompletedTodo() {
  let completed = databases.filter((task) => task.Complete == true);
  return completed;
}

function getAllIncompletenessTodo() {
  let inCompleted = databases.filter((task) => task.Complete == false);
  return inCompleted;
}

function showTasks(tasks, numberTodo) {
  newTodoElement.innerHTML = "";
  for (let i of tasks) {
    createTodoElement(i);
  }
  CounterElement.innerHTML = numberTodo;
  if (tasks.length == 0) {
    nowTodoElement.classList.remove("none");
  }
}

showAllCompleteElement.onclick = function (e) {
  let CompletedTodo = getAllCompletedTodo();
  addActive(showAllCompleteElement);
  showTasks(CompletedTodo, CompletedTodo.length);
};
InCompleteTodoElement.onclick = function (e) {
  let inCompletedTodo = getAllIncompletenessTodo();
  addActive(InCompleteTodoElement);
  showTasks(inCompletedTodo, inCompletedTodo.length);
};
allTodoElement.onclick = function (e) {
  let allTodo = databases;
  addActive(allTodoElement);
  showTasks(allTodo, allTodo.length);
};

function addActive(active) {
  let act = document.querySelector(".active");
  act.classList.remove("active");
  active.classList.add("active");
}
