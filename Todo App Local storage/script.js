const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null; //because I need to access in add function and edit function both

//Function to Add Todo
const addTodo = () => {
  const inputText = inputBox.value.trim();

  if (inputText.length <= 0) {
    alert("you must write something in your todo");
    return false;
  }

  if (addBtn.value === "Edit") {
    // Passing the original text to editLocalTodos function before edit it in the todoList
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText; //p tag
    addBtn.value = "Add"; // adding a new li (duplicate)
    inputBox.value = "";
  } else {
    //Creating a p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    //Creating edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

    //Creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "deleteBtn");
    deleteBtn.innerText = "Remove";
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

//Function to Update Todo(Edit/Delete)
const updateTodo = (e) => {
  //   console.log(e.target.innerHTML);

  if (e.target.innerHTML === "Remove") {
    // console.log(e.target.parentElement);//li as we need to remove entire parent element li
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML; //p tag (so that it will go in above edit box)
    inputBox.focus();
    addBtn.value = "Edit"; // But this will add new element, so go global
    editTodo = e;
  }
};

const saveLocalTodos = (todo) => {
  let todos;

  // todos=localStorage.getItem("todos");//accessing old todos which are saved already in local storage. We access items by using getIteam and we just have to pass a key in that.
  // console.log("This is local storage exising", localStorage.getItem("todos"));
  // console.log(JSON.parse(localStorage.getItem("todos")));

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  console.log("Array", todos);
  localStorage.setItem("todos", JSON.stringify(todos)); // todos is name of key, which you are storing in todo array in form of string object. Because local storage always stores data in form of an object
  // but upto here its replacing the old one. we want to check first if somehing exists , and then need to store new item in the last. So now go to line 2 of this function

  // console.log(localStorage.setItem("todos", JSON.stringify(todos)));
};

//Now they are stored in local storage , though not visible on refresh

const getLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));

    console.log("Array in get Todo", todos);
    todos.forEach((todo) => {
      //Creating a p tag
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      //Creating edit button
      const editBtn = document.createElement("button");
      editBtn.classList.add("btn", "editBtn");
      editBtn.innerText = "Edit";
      li.appendChild(editBtn);

      //Creating delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "deleteBtn");
      deleteBtn.innerText = "Remove";
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

//we need to remove from local storage
const deleteLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoText = todo.children[0].innerHTML;
  // console.log("todotext", todoText.children[0]);//li, but on which index?
  // console.log("todotext", todoText.children[1]);

  // console.log(todoText.children[0].innerHTML);

  let todoIndex = todos.indexOf(todoText); //first occurance of todoIndex
  // console.log(todoIndex);

  // Array functions: slice/splice
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos)); //array's object will be converted to string
};

//we need to edit also from local storage

const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
