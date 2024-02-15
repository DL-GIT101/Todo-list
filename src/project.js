import { createTODO } from "./todo";

const createProject = (title) => {
    
    let _title = title;
    let _todos = [];

    const project = {
        setTitle: (newTitle) => _title = newTitle, 
        getTitle: () => _title,
        getTodos: () => _todos,
        addTodo: (todo) => {
            todo.setProject(_title);
            _todos.push(todo);
        },
        removeTodo: (todoToBeRemove) => _todos =_todos.filter(todo => todo !== todoToBeRemove),

    }

    return project;
}

export {createProject};