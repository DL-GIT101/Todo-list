import { createTODO } from "./todo";

const createProject = (title) => {
    
    let _title = title;
    let _allTodos = [];

    const project = {
        setTitle: (newTitle) => _title = newTitle, 
        getTitle: () => _title,
        getTodos: () => _allTodos,
        addTodo: (todo) => {
            todo.setProject(_title);
            _allTodos.push(todo);
        },
        removeTodo: (todoToBeRemove) => _allTodos =_allTodos.filter(todo => todo !== todoToBeRemove),

    }

    return project;
}

export {createProject};