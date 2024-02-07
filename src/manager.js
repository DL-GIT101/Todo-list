import _ from "lodash";
import { createProject } from "./project";

const createManager = () => {

    let _allProjects = [];

    const manager = {
        getProjects: () => _allProjects,
        addProject: (title) => _allProjects.push(createProject(title)),
        deleteProject: (projectToBeRemove) => _allProjects = _allProjects.filter(project => project !== projectToBeRemove),
    }

    return manager;
}

export {createManager};