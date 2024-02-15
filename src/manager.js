import _ from "lodash";
import { createProject } from "./project";

const createManager = () => {

    let _allProjects = [];

    const manager = {
        getProjects: () => _allProjects,
        addProject: (project) => _allProjects.push(project),
        deleteProject: (projectToBeRemove) => _allProjects = _allProjects.filter(project => project !== projectToBeRemove),
        getAllTodos: () => {
            const allTodo = [];
            _allProjects.forEach(project => {
                allTodo.push(...project.getTodos());
            })
            return allTodo;
        },
    }

    return manager;
}

export {createManager};