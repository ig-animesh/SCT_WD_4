const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addTodoButton = document.getElementById('add-todo-button');

let todos = [];
let id = 0;

todoForm.addEventListener('submit', addTodo);
addTodoButton.addEventListener('click', addTodo);

function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText === '') {
        return;
    }
    const todo = {
        id: id,
        text: todoText,
        completed: false
    };
    todos.push(todo);
    todoInput.value = '';
    renderTodos();
    id++;
}

function renderTodos() {
    const todoListHTML = todos.map((todo) => {
        return `
            <li class="todo-item" data-id="${todo.id}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
                <button class="delete-button">Delete</button>
            </li>
        `;
    }).join('');
    todoList.innerHTML = todoListHTML;
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteTodo);
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', toggleCompleted);
    });
}

function deleteTodo(event) {
    const todoItem = event.target.parentNode;
    const todoId = parseInt(todoItem.getAttribute('data-id'));
    todos = todos.filter((todo) => todo.id !== todoId);
    renderTodos();
}

function toggleCompleted(event) {
    const todoItem = event.target.parentNode;
    const todoId = parseInt(todoItem.getAttribute('data-id'));
    const todo = todos.find((todo) => todo.id === todoId);
    todo.completed = event.target.checked;
    renderTodos();
}
