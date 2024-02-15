import _ from "lodash";
import { createProject } from "./project";

const createManager = () => {

    let _projects = [];

    const manager = {
        getProjects: () => _projects,
        addProject: (project) => _projects.push(project),
        deleteProject: (projectToBeRemove) => _projects = _projects.filter(project => project !== projectToBeRemove),
        getAllTodos: () => {
            const allTodo = [];
            _projects.forEach(project => {
                allTodo.push(...project.getTodos());
            })
            return allTodo;
        },
    }

    return manager;
}

export {createManager};