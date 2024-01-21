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

let databases = [];

function addId() {
  let id = Math.random();
  return id;
}

function addTodo(name) {
  let todo = new Object();
  todo.name = name;
  todo.Complete = false;
  todo.id = addId();
  databases.push(todo);
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

function addTodoPage(todo) {
  const divNewTodo = document.createElement("div");
  const divCircle = document.createElement("div");
  const p = document.createElement("p");
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
  noTodo();

  deleteIcon.onclick = function (e) {
    deleteTodoPage(divNewTodo);
  };
  divCircle.onclick = function (e) {
    addCompletePage(divCircle, p, todo);
  };
  console.log(databases);
}

function noTodo() {
  if (databases.length >= 1) {
    nowTodoElement.classList.add("none");
  }
}

function addCompletePage(Circle, p, todo) {
  completeTodo(todo.id);
  Circle.classList.toggle("check");
  p.classList.toggle("Line_middle");
  if (Circle.className != "circle check") {
    IncompletenessTodo(todo.id);
  }
}

function deleteTodoPage(deleteNewTodo) {
  deleteTodo(deleteNewTodo.id);
  deleteNewTodo.remove();
  if (databases.length == 0) {
    nowTodoElement.classList.remove("none");
  }
}

formElement.onsubmit = function (event) {
  event.preventDefault();
  if (verificationNewTodo().valid == true) {
    errorInputElement.innerHTML = "";
    addTodoPage(addTodo(newTodoInputElement.value));
    newTodoInputElement.value = "";
  } else {
    errorInputElement.innerHTML = verificationNewTodo().error;
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
  databases.splice(index, 1);
}

function getAllCompletedTodo() {
  let completed = databases.filter((task) => task.Complete == true);
  return completed;
}

function showAllComplete() {
  let allComplete = getAllCompletedTodo();
  newTodoElement.innerHTML = "";

  if (allComplete.length > 0) {
    for (let i of allComplete) {
      addTodoPage(i);
    }
  } else {
    nowTodoElement.classList.remove("none");
  }
}



function getAllIncompletenessTodo() {
  let inCompleted = databases.filter((task) => task.Complete == false);
  return inCompleted;
}

function showAllInComplete() {
  let allInComplete = getAllIncompletenessTodo();
  newTodoElement.innerHTML = "";
  if (allInComplete.length > 0) {
    for (let i of allInComplete) {
      addTodoPage(i);
    }
  } else {
    nowTodoElement.classList.remove("none");
  }
}

function allTodo() {
  newTodoElement.innerHTML = "";
  for (let i of databases) {
    addTodoPage(i);
  }
}

function addActive(active){
  let act = document.querySelector(".active");
  act.classList.remove("active");
  active.classList.add("active");
}

showAllCompleteElement.onclick = function (e) {
  addActive(showAllCompleteElement);
  showAllComplete();
};
InCompleteTodoElement.onclick = function (e) {
  addActive(InCompleteTodoElement);
  showAllInComplete();
};
allTodoElement.onclick = function (e) {
  addActive(allTodoElement);
  allTodo();
};

darkImgElement.onclick = function (e) {
  htmlElement.classList.toggle("dark");
};
