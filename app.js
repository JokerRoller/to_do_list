// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);
// Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault(); 
    // Todo DIV
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerHTML = todoInput.value;
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    // CHECK MARK BUTTON
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    // CHECK trash BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    // Clear Todo INPUT VALUE
    todoInput.value = ''
}
function deleteCheck(e) {
    const item = e.target;
    // DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove()
        });
    }
    //CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
    switch (e.target.value) {
        case "all":
            todo.style.display = 'flex';
            break;
        case "completed":
            if (todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            }   else {
                todo.style.display = 'none';
            }
            break;
        case "uncompleted":
            if (!todo.classList.contains('completed')) {
                todo.style.display = 'flex'
            }   else {
                todo.style.display = 'none'
            }  
    }
    });
}
function saveLocalTodos(todo) {
    // CHECK---HEY Do I already have things in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // Todo DIV
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerHTML = todo; //<<<<<<<<
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTORAGE
    // saveLocalTodos(todoInput.value); <<<<<<<<<<
    // CHECK MARK BUTTON
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    // CHECK trash BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    })
}
function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

