const todoContainerEl =  document.querySelector('#todoContainer')
const todoInputEl =  document.querySelector('#todoInput')
const todoButtonEl =  document.querySelector('#todoButton')
const logoutButtonEl =  document.querySelector('#logoutButton')


const isLogin = () => {
    const loginedUser = localStorage.getItem('login');
    if (!loginedUser) {
        alert('로그인이 필요합니다!')
        location.href = '../html/signin.html';
    }
}

const logout = () => {
    localStorage.removeItem('login');
    location.href = '../html/index.html';
}

const readTodo = () => {
    todoContainerEl.innerHTML = '';

    const todos = JSON.parse(localStorage.getItem('todos')).reverse();

    console.log(todos)

    todos.forEach(todo => {
        const divEl = document.createElement('div')
        const completeEl = document.createElement('input');
        const userEl = document.createElement('p');
        const deleteEl = document.createElement('button');
        const contentEl = document.createElement('label')

        divEl.className = 'todoItem';

        completeEl.type = 'checkbox';
        completeEl.className = 'checkbox'
        completeEl.id = todo.id;
        completeEl.addEventListener('click', () => {
            updateComplete(todo.id, completeEl.checked);
        })
        completeEl.checked = todo.complete;

        deleteEl.type = 'button';
        deleteEl.textContent = 'X';
        deleteEl.className = 'deleteButton';
        deleteEl.addEventListener('click', () => deleteTodo(todo.id))

        contentEl.textContent = todo.content;
        contentEl.htmlFor = todo.id;

        userEl.textContent = todo.user;

        divEl.append(completeEl, contentEl, userEl, deleteEl)
        todoContainerEl.append(divEl)
    })
}

const createTodo = () => {
    const todoText = todoInputEl.value;

    const todos = JSON.parse(localStorage.getItem('todos'));
    const newId = todos.length > 0 ? todos[todos.length-1].id + 1 : 1;

    const newTodo = {
        id: newId,
        complete: false,
        content: todoText,
        user: JSON.parse(localStorage.getItem('login')),
    };

    todos.push(newTodo);

    localStorage.setItem('todos', JSON.stringify(todos));
    todoInputEl.value = '';

    readTodo();

}


const deleteTodo = (deleteId) => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const filterdTodos = todos.filter((todo) => todo.id !== deleteId);

    localStorage.setItem('todos', JSON.stringify(filterdTodos));
    readTodo();

};


//updateComplete(todo.id, completeEl.checked);
//todo completeEl.checked는 boolean값을 가짐 -> 상태값 반전 시켜야함, 새로고침해도 유지되어야 함

const updateComplete = (updateId, isChecked) => {
    const todos = JSON.parse(localStorage.getItem('todos'));

    todos.map((todo) => {
        if (todo.id === updateId) {
            todo.complete = isChecked
            return todo
        }else {
            return todo;
        }
    })

    localStorage.setItem('todos', JSON.stringify(todos));

    readTodo();
}

const init = () => {
    isLogin();

    if (!localStorage.getItem('todos')) {
        localStorage.setItem('todos', JSON.stringify([]))
    }

    readTodo();

    todoButtonEl.addEventListener('click', createTodo);

    logoutButtonEl.addEventListener('click', logout);
}

document.addEventListener('DOMContentLoaded', init) //돔 콘텐츠 다 로드 되면 init 실행