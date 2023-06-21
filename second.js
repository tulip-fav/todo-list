const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todolist');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMcontentloaded', getLocalTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", DeleteCheck)
filterOption.addEventListener("change", filterTodo)

function addTodo(event){
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innertext = todoInput.value;
    newTodo.classList.add('todo-items')
    todoDiv.appendChild(newTodo)
    saveLocalTodos(todoInput.value)


    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class"fas fa-check-circle"></li>';
    completeButton.classList.add("complete-btn")
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement('button')
    completeButton.innerHTML = '<i class"fas fa-trash"></li>';
    completeButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv)
    todoInput.value= ""

}

function deleteCheck(e){
    const item = e.etarget

     if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })

    }

    if(item.classList[0]==="complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todo = todoList.childNodes;
    todo.forEach(function (todo){
        switch(e.target.value){
            case "all":
               todo.style.display = "flex";
            break;
            case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display ="flex";
            } else{
                todo.style.display ="none"
            }
            break;
            case "incomplete":
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex";
                } else{
                    todo.style.display ="none"
                }
                
    
        }
    });
}

function saveLocalTodos(todo) {
    let todos ;
    if(localStorage.getItem("todos")===null){
        todo = [];

    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.getItem("todos", JSON.stringify(todos));
}

function getLocalTodos(){
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos = [];
    } else{
        todos = JSON.parse(localstorage.getLocalTodos("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")
        const newTodo= document.createElement("li")
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completeButton= document.createElement("button")
        completeButton.innerHTML = '<i class = "fas fa-check-circle>"</li>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const trashButton= document.createElement("button")
        trashButton.innerHTML = '<i class = "fas fa-trash>"</li>';
        completeButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    } else {
        todos= JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexof(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos ))
}

