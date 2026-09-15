const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('myTodos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.style.cursor = 'pointer';
        span.onclick = () => toggleTodo(index);

        const delBtn = document.createElement('button');
        delBtn.textContent = '删除';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deleteTodo(index);

        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });

    localStorage.setItem('myTodos', JSON.stringify(todos));
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;
    todos.push({ text: text, completed: false });
    todoInput.value = '';
    renderTodos();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

renderTodos();
