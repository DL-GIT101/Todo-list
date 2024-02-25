import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';
import {compareAsc, format} from "date-fns";
  
//doc creator

const createButton = (name,text) => {

    const button = document.createElement("button");
    button.className = name;
    button.textContent = text;
    return button;
} 

const createDiv = (className) => {

    const div = document.createElement("div");
    div.className = className;
    return div;
}

//todo doms creator

const createProjectLi = (project) => {

    const list = document.createElement("li");
    list.className = "project";

    const wrapper = createDiv("wrapper");

    const holder = createDiv("title-holder");

    const title = document.createElement('p');
    title.className = "title";
    title.textContent = project.getTitle();

    holder.appendChild(title);
    wrapper.appendChild(holder);
    list.append(wrapper);

    return list;
}

const createCurrentProjectLi = (project) => {

    const projectLi = createProjectLi(project);

    projectLi.classList.add("current");
    const wrapper = projectLi.childNodes[0];
    
    const deleteButton = createButton("delete","delete");

    wrapper.appendChild(deleteButton);

    return projectLi;
}

const createProjectList = (projectList) => {

    const projectListUL = document.createElement("UL");
    projectListUL.className = "project-list";

    projectList.forEach(project => {

        const list = createProjectLi(project);
        projectListUL.appendChild(list);
    });

    return projectListUL;
}

const createTodoInput = (todo) => {

    const todoLi = createExpandedTodoLi(todo);
    const wrapper = createDiv("wrapper");
    const detailsInputDiv = createDiv("edit-details");

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type","text");
    titleInput.id = "title";
    titleInput.value = todo.getTitle();

    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type","text");
    descriptionInput.id = "description";
    descriptionInput.value = todo.getDescription();

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type","date");
    dueDateInput.id = "dueDate";
    dueDateInput.value = todo.getDueDate();

    const priortySelect = document.createElement("select");
    priortySelect.id = "priority";

    const priorities = ["High","Medium","Low"];
    priorities.forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        if(priority === todo.getPriority()){
            option.selected = true;
        }
        priortySelect.appendChild(option);
    });
    
    detailsInputDiv.append(titleInput,descriptionInput,dueDateInput,priortySelect);

    const submitButton = createButton("submit","submit");

    wrapper.append(detailsInputDiv,submitButton);
    todoLi.replaceChild(wrapper, todoLi.firstChild);
    todoLi.classList.add("edit");
    return todoLi;
}

const createExpandedTodoLi = (todo) => {

    const todoLi = createTodoLi(todo);
    const wrapper = todoLi.childNodes[0];

    const details = createDiv("details");

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = todo.getTitle();

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = todo.getDescription();

    const dueDate = document.createElement("p");
    dueDate.className = "dueDate";
    dueDate.textContent = format(todo.getDueDate(), "PPPP");

    const priority = document.createElement("p");
    priority.className = "priority";
    priority.textContent = todo.getPriority();

    //style depending on piority
    todoLi.classList.add((todo.getPriority()).toLowerCase());
    todoLi.classList.add("current");

    details.append(title,description,dueDate,priority);

    wrapper.replaceChild(details, wrapper.firstChild);

    const editButton = createButton("edit","edit");
    const deleteButton = createButton("delete", "delete");

    wrapper.append(editButton,deleteButton);

    return todoLi;
}

const createTodoLi = (todo) => {

    const todoLi = document.createElement("li");
    todoLi.className = "todo";

    const wrapper = createDiv("wrapper");

    const details = createDiv("details");

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = todo.getTitle();

    const dueDate = document.createElement("p");
    dueDate.className = "dueDate";
    dueDate.textContent = format(todo.getDueDate(), "PPPP");

    //style depending on piority
    todoLi.classList.add((todo.getPriority()).toLowerCase());

    details.append(title,dueDate);

    wrapper.appendChild(details);
    todoLi.appendChild(wrapper);

    return todoLi;
}

const createProjectTodoList = (todos) => {

    const todoUl = document.createElement("UL");
    todoUl.className = "todo-list";

    todos.sort((a,b) => compareAsc(a.getDueDate(),b.getDueDate()));

    todos.forEach( todo => {

        const todoLi = createTodoLi(todo);
        todoUl.appendChild(todoLi);
    });

    return todoUl;
}

const createProjectTitleInput = (project) => {

    const header = document.createElement("header");
    header.className = "title-holder";

    //create input 
    const input = document.createElement("input");
    input.type = "text";
    input.id = "projectTitle";
    input.value = project.getTitle();
    //add submit button
    const submitButton = createButton("submit", "submit");
    header.append(input,submitButton);

    return header;
}

const createProjectTitle = (project) => {

    const header = document.createElement("header");
    header.className = "title-holder";

    const projectTitle = document.createElement('p');
    projectTitle.className = "title";
    projectTitle.textContent = project.getTitle().toUpperCase();
    
    const renameButton = createButton("rename", "rename");
    
    header.append(projectTitle, renameButton);

    return header;
}

const createProjectDetails = (project) => {

    const projectContainer = document.createElement("container");
    projectContainer.className = "project-details";

    const projectTitle = createProjectTitle(project);

    const projectUL = createProjectTodoList(project.getTodos());

    const projectTodoAddButton = createButton("add", "Add");

    projectContainer.append(projectTitle,projectUL,projectTodoAddButton);

    return projectContainer;
}

const TodoList = (manager) => {

    //layout
    const body = document.querySelector('body');
    const main = document.createElement("container");
    main.className = "main";
    const sidebar = document.createElement("aside");
    sidebar.className = "manager";
    const board = document.createElement("section");
    board.className = "board";
    main.append(sidebar,board);
    body.append(main);

    let projects = manager.getProjects();

    //sidebar
        //all todos button
    const allTodosButton = createButton("all-todos","All");
        ///project list
    let projectList = createProjectList(projects);
        // add project button
    const addProjectButton = createButton("add-project", "+");
    sidebar.append(allTodosButton,projectList,addProjectButton);

    let currentProjectIndex;
    let currentProject;
    let projectDetails;

    //separate project for all todos
    const allTodosProject = createProject("Default");

    sidebar.addEventListener("click", (event) => {
        const target = event.target;

        if(target.matches(".all-todos")){ // all todo button
            //delete button on when clicked
            projectList = createProjectList(projects);
            sidebar.replaceChild(projectList,sidebar.childNodes[1]);
            //remove not "All" project todos
            const allTodosProjectTodos = allTodosProject.getTodos();
            allTodosProjectTodos.forEach(todo => {
                if(todo.getProject() !== "Default" ){
                    allTodosProject.removeTodo(todo)
                }
            })
            //add project todos
            let getAllTodos = manager.getAllTodos();
            getAllTodos.forEach(todo => {
                allTodosProject.addTodo(todo);
            });
            currentProject = allTodosProject;
            projectDetails = createProjectDetails(currentProject);
            //remove edit title button
            const titleHolder = projectDetails.childNodes[0];
            titleHolder.firstChild.textContent = "All";
            titleHolder.removeChild(titleHolder.lastChild);
            
            if(!board.hasChildNodes()){
                board.appendChild(projectDetails);
            }else{
                board.replaceChild(projectDetails, board.childNodes[0]);
            }

        }else if(target.matches(".add-project")){ // add project button
            //add new project then dispaly it current
            const newProject = createProject("New");
            manager.addProject(newProject);
            currentProjectIndex = projects.length - 1;
            projectList = createProjectList(projects);
            const currenProjectLi = createCurrentProjectLi(projects[currentProjectIndex]);
            projectList.replaceChild(currenProjectLi, projectList.lastChild);
            sidebar.replaceChild(projectList,sidebar.childNodes[1]);

            currentProject = projects[currentProjectIndex];
            projectDetails = createProjectDetails(currentProject);
            if(!board.hasChildNodes()){
                board.appendChild(projectDetails);
            }else{
                board.replaceChild(projectDetails, board.childNodes[0]);
            }

        }else if(target.closest(".title-holder")){ //project List
            const projectListArray = [...projectList.childNodes];
            currentProjectIndex = projectListArray.indexOf(target.closest(".project"));

            projectList = createProjectList(projects);
            //append delete button
            const currenProjectLi = createCurrentProjectLi(projects[currentProjectIndex]);
            projectList.replaceChild(currenProjectLi, projectList.childNodes[currentProjectIndex]);
            sidebar.replaceChild(projectList,sidebar.childNodes[1]);

            currentProject = projects[currentProjectIndex];
            projectDetails = createProjectDetails(currentProject);
            if(!board.hasChildNodes()){
                board.appendChild(projectDetails);
            }else{
                board.replaceChild(projectDetails, board.childNodes[0]);
            }

        }else if(target.matches(".manager > .project-list > .project.current > .wrapper > .delete")){ //delete button
            //delete a project
            manager.removeProject(currentProject);
            //get new Project List
            projects = manager.getProjects()
            //append new projectList
            projectList = createProjectList(projects);
            sidebar.replaceChild(projectList,sidebar.childNodes[1]);
            board.removeChild(board.firstElementChild);
        }
    });

    let todoList;
    let todos;
    let currentTodoIndex;
    let currentTodo;

    board.addEventListener("click", (event) => {
        const target = event.target;
        console.log(target);

        if(target.matches(".project-details > .title-holder >.rename")){ //rename button
            //create input and append
            const titleInput = createProjectTitleInput(currentProject);
            projectDetails.replaceChild(titleInput, projectDetails.firstElementChild);
            
        }else if(target.matches(".project-details > .title-holder > .submit")){
            //get input value
            const inputTitle = projectDetails.childNodes[0].childNodes[0];
            //set input value
            currentProject.setTitle(inputTitle.value);
            //update the project Details
            projectDetails = createProjectDetails(currentProject);
            board.replaceChild(projectDetails, board.childNodes[0]);
            //update the project list
            projectList = createProjectList(projects);
            //append delete button
            const currenProjectLi = createCurrentProjectLi(currentProject);
            projectList.replaceChild(currenProjectLi, projectList.childNodes[currentProjectIndex]);
            sidebar.replaceChild(projectList,sidebar.childNodes[1]);

        }else if(target.closest(".project-details > .todo-list > .todo > .wrapper > .details")){
            //get current todos and todo
            todoList = projectDetails.childNodes[1];
            const todoListArray = [...todoList.childNodes];
            currentTodoIndex = todoListArray.indexOf(target.closest(".todo"));
            todos = currentProject.getTodos();
            currentTodo = todos[currentTodoIndex];
            //create expanded todo list then append to project details
            todoList = createProjectTodoList(todos);
            const expandedTodo = createExpandedTodoLi(currentTodo);
            todoList.replaceChild(expandedTodo, todoList.childNodes[currentTodoIndex]);
            projectDetails.replaceChild(todoList,projectDetails.childNodes[1]);
        
        }else if(target.matches(".project-details > .todo-list > .todo.current > .wrapper > .edit")){
            //create todo inputs then replace the list
            const todoInput = createTodoInput(currentTodo);
            todoList.replaceChild(todoInput,todoList.childNodes[currentTodoIndex]);
            
        }else if(target.matches(".project-details > .todo-list > .todo.current > .wrapper > .delete")){
            //delete todo - add additional method remove "actual" todo
            if(currentProject.getTitle() === "Default"){
                manager.removeTodo(currentTodo);
            }
            currentProject.removeTodo(currentTodo);
            //get updated todo list
            todos = currentProject.getTodos();
            todoList = createProjectTodoList(todos);
            projectDetails.replaceChild(todoList,projectDetails.childNodes[1]);

        }else if(target.matches(".project-details > .todo-list > .todo.current.edit > .wrapper > .submit")){
            //get inputs
            const details = target.closest(".wrapper").childNodes[0];
            //set values
            currentTodo.setTitle(details.querySelector("#title").value);
            currentTodo.setDescription(details.querySelector("#description").value);
            currentTodo.setDueDate(details.querySelector("#dueDate").value);
            currentTodo.setPriority(details.querySelector("#priority").value);
            //replace with current expanded todo li
            todoList = createProjectTodoList(todos);
            currentTodoIndex = todos.findIndex((todo) => todo === currentTodo);
            const expandedTodo = createExpandedTodoLi(currentTodo);
            todoList.replaceChild(expandedTodo, todoList.childNodes[currentTodoIndex]);
            projectDetails.replaceChild(todoList,projectDetails.childNodes[1]);
        }else if(target.matches(".project-details > .add")){
            currentTodo = createTODO();
            currentProject.addTodo(currentTodo);
            //get updated todo list
            todos = currentProject.getTodos();
            todoList = createProjectTodoList(todos);
            currentTodoIndex = todos.findIndex((todo) => todo === currentTodo);
            const expandedTodo = createExpandedTodoLi(currentTodo);
            todoList.replaceChild(expandedTodo, todoList.childNodes[currentTodoIndex]);
            projectDetails.replaceChild(todoList,projectDetails.childNodes[1]);
        }
    });

}   

const sampleManagerCreator = () => {

    const sampleManager = createManager();

    const workProject = createProject("Work");
    const choreProject = createProject("Chores");

    const todo1 = createTODO("Buy Groceries","Pick up fruits, vegetables, and bread", "2024-03-02", "Medium",choreProject.getTitle());
    const todo2 = createTODO("Plan Vacation", "Research destinations and book accommodations", "2024-06-25", "Medium",workProject.getTitle());
    const todo3 = createTODO("Complete Report", "Finish the quarterly report for the team meeting", "2024-02-15", "High",workProject.getTitle());
    const todo4 = createTODO("Call Mom", "Check in with Mom and wish her a happy birthday", "2024-04-18", "Low",choreProject.getTitle());

    choreProject.addTodo(todo1);
    choreProject.addTodo(todo4);
    workProject.addTodo(todo2);
    workProject.addTodo(todo3);

    sampleManager.addProject(workProject);
    sampleManager.addProject(choreProject);

    return sampleManager;
}

const getTodoProperties = (todo) => {
    
    const properties = {

        title: todo.getTitle(),
        description: todo.getDescription(),
        dueDate: todo.getDueDate(),
        priority: todo.getPriority(),
        project: todo.getProject(),

    }

    return properties;
}

const getProjectProperties = (project) => {
    
    const todosArray = project.getTodos();
    const todoProperties = todosArray.map(getTodoProperties);

    const properties = {

        title: project.getTitle(),
        todos: todoProperties,
    }

    return properties;
}

const managerIntoJSON = (manager) => {
    
    const projectsArray = manager.getProjects();
    const projectProperties = projectsArray.map(getProjectProperties);

    return JSON.stringify(projectProperties);
}

const jsonIntoManager = (managerJSON) => {

    const parseManager = JSON.parse(managerJSON);
    const manager = createManager();
 
    parseManager.forEach(project => {
        manager.addProject(parseIntoProject(project));
    })

    return manager;
}

const parseIntoProject = (projectsParse) => {

    const project = createProject(projectsParse.title);
    const todos = projectsParse.todos;
 
    todos.forEach(todo => {
        project.addTodo(parseIntoTodo(todo));
    })

    return project;
}

const parseIntoTodo = (todoParse) => {

    return createTODO(todoParse.title,todoParse.description,todoParse.dueDate,todoParse.priority,todoParse.project);
}

const workProject = createProject("Work");
const todo2 = createTODO("Plan Vacation", "Research destinations and book accommodations", "2024-06-25", "Medium",workProject.getTitle());
const todo3 = createTODO("Complete Report", "Finish the quarterly report for the team meeting", "2024-02-15", "High",workProject.getTitle());
workProject.addTodo(todo2);
workProject.addTodo(todo3);

const manager = createManager();
manager.addProject(workProject);

localStorage.setItem("manager", managerIntoJSON(manager));

const managerJSON = localStorage.getItem("manager");
const managerLocal = jsonIntoManager(managerJSON);

TodoList(sampleManagerCreator());

