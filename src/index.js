import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';

//                 const editButton = () => {
//                     const button = document.createElement("button");
//                     button.className = button.textContent = "edit";
//                     button.addEventListener("click", () => {
//                         div.textContent = '';
//                         div.removeEventListener("click", expandTodo);
//                         container.classList.add("expanded");

//                         const inputTitle = document.createElement("input");
//                         inputTitle.setAttribute("type","text");
//                         inputTitle.id = "todoTitle";
//                         inputTitle.value = todo.getTitle();

//                         const inputDescription = document.createElement("input");
//                         inputDescription.setAttribute("type","text");
//                         inputDescription.id = "todoDescription";
//                         inputDescription.value = todo.getDescription();

//                         const inputDate = document.createElement("input");
//                         inputDate.setAttribute("type","date");
//                         inputDate.id = "todoDueDate";
//                         inputDate.value = todo.getDueDate();

//                         const selectPriority = document.createElement("select");
//                         selectPriority.id = "todoPriority";

//                         const priorities = ["High","Medium","Low"];
//                         priorities.forEach(priority => {
//                             const option = document.createElement("option");
//                             option.value = priority;
//                             option.textContent = priority;
//                             if(priority === todo.getPriority()){
//                                 option.selected = true;
//                             }
//                             selectPriority.appendChild(option);
//                         });
                        
//                         const submit = document.createElement("button");
//                         submit.className = "submit";
//                         submit.textContent = "OK";
//                         submit.addEventListener("click", () => {
//                             todo.setTitle(inputTitle.value);
//                             todo.setDescription(inputDescription.value);
//                             todo.setDueDate(inputDate.value);
//                             todo.setPriority(selectPriority.value);
//                             displayProject(project);
//                             expandTodo();
//                         });

//                         container.replaceChild(submit, container.childNodes[1]);
//                         div.append(inputTitle,inputDescription,inputDate,selectPriority);
//                     });
//                     container.appendChild(button);
//                 }
        
//                 const deleteButton = () => {
//                     const button = document.createElement("button");
//                     button.className = button.textContent = "delete";
//                     button.addEventListener("click", () => {
                        
//                     });
//                     container.appendChild(button);
//                 }
    
//                 div.append(title,dueDate);

//                 const expandTodo = () => {
//                     displayTodoDetails(todo);
//                 }

//                 div.addEventListener("click", expandTodo);
//                 container.appendChild(div);
//                 editButton();
//                 deleteButton();
//                 board.appendChild(container);
//             });
//         }

//         const addTodoButton = () => {
//             const container = document.createElement("container");
//             container.className = "todo add";
        
//             const title = document.createElement("p");
//             title.className = "title";
//             title.textContent = "+";
//             container.appendChild(title);
//             board.appendChild(container);
//         }

//         if(project === "all"){
//             displayAllTodos(manager.getAllTodos());
//             addTodoButton();
//         }else {
//             title();
//             displayAllTodos(project.getTodos());
//             addTodoButton();
//         }
//     }

//     const displayTodoDetails = (todo) => {
//         const container = document.querySelector(".board > .todo");
//         const div = document.querySelector(".board > .todo > .details");
//         div.textContent = '';
//         const details = {
//             "title":todo.getTitle(),
//             "description":todo.getDescription(),
//             "dueDate": todo.getDueDate(),
//             "priority":todo.getPriority(),
//         };

//         for (let detail in details) {
//             const p = document.createElement('p');
//             p.className = detail;
//             p.textContent = details[detail];
//             div.appendChild(p);
//         }
//         container.classList.add("expanded");
//     }

//     initialDataLoad(manager);
//     layout();
//     displayProjectList(manager);
//     displayProject("all");
// }

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
    const detailsInputDiv = createDiv("details");

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
    priortySelect.id = "todoPriority";

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
    dueDate.textContent = todo.getDueDate();

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
    dueDate.textContent = todo.getDueDate();

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

    projectContainer.append(projectTitle,projectUL);

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

    sidebar.addEventListener("click", (event) => {
        const target = event.target;

        if(target.matches(".all-todos")){ // all todo button
            //delete button on when clicked
            projectList = createProjectList(projects);
            sidebar.replaceChild(projectList,sidebar.childNodes[1]);
            //separate project for all todos
            const allTodos = manager.getAllTodos();
            currentProject = createProject("All");
            allTodos.forEach(todo => {
                currentProject.addTodo(todo);
            });

            const projectDetails = createProjectDetails(currentProject);
            //remove edit title button
            const titleHolder = projectDetails.childNodes[0];
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
            const projectDetails = createProjectDetails(currentProject);
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
            const projectDetails = createProjectDetails(currentProject);
            if(!board.hasChildNodes()){
                board.appendChild(projectDetails);
            }else{
                board.replaceChild(projectDetails, board.childNodes[0]);
            }

        }else if(target.matches(".manager > .project-list > .project.current > .wrapper > .delete")){ //delete button
            //delete a project
            manager.deleteProject(currentProject);
            //get new Project List
            projects = manager.getProjects()
            //append new projectList
            projectList = createProjectList(projects);
            sidebar.replaceChild(projectList,sidebar.childNodes[1]);
            board.removeChild(board.firstElementChild);
        }
    });

    let projectDetails;
    let todoList;
    let todos;
    let currentTodoIndex;
    let currentTodo;

    board.addEventListener("click", (event) => {
        const target = event.target;
        console.log(target);

        if(target.matches(".project-details > .title-holder >.rename")){ //rename button
            //get project Container
            projectDetails = target.closest(".project-details");
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
            projectDetails = target.closest(".project-details");
            todoList = target.closest(".todo-list");
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
            const todoInput = createTodoInput(currentTodo);
            todoList.replaceChild(todoInput,todoList.childNodes[currentTodoIndex]);
            
        }else if(target.matches(".board > .todo-list > .todo > .wrapper > .submit")){
            // const project = board.querySelector(".project");
            // const projectIndex = project.getAttribute("projectIndex");
            // let  todos = projects[projectIndex].getTodos();
            // const todoIndex =  target.closest(".todo").getAttribute("todoIndex");
            // const todo = todos[todoIndex];

            // const todoList = target.closest(".todo");
            // const wrapper = todoList.childNodes[0];
            // const details = wrapper.childNodes[0];

            // todo.setTitle(details.childNodes[0].value);
            // todo.setDescription(details.childNodes[1].value);
            // todo.setDueDate(details.childNodes[2].value);
            // todo.setPriority(details.childNodes[3].value);

            // const expandedDetail = displayExpandedTodo(todo);
            // wrapper.replaceChild(expandedDetail,wrapper.childNodes[0]);
        }
    });

}   

const sampleManagerCreator = () => {

    const sampleManager = createManager();

    const workProject = createProject("Work");
    const choreProject = createProject("Chores");

    const todo1 = createTODO("Buy Groceries","Pick up fruits, vegetables, and bread", "2024-03-02", "Medium");
    const todo2 = createTODO("Plan Vacation", "Research destinations and book accommodations", "2024-06-25", "Medium");
    const todo3 = createTODO("Complete Report", "Finish the quarterly report for the team meeting", "2024-02-15", "High");
    const todo4 = createTODO("Call Mom", "Check in with Mom and wish her a happy birthday", "2024-04-18", "Low");

    choreProject.addTodo(todo1);
    choreProject.addTodo(todo4);
    workProject.addTodo(todo2);
    workProject.addTodo(todo3);

    sampleManager.addProject(workProject);
    sampleManager.addProject(choreProject);

    return sampleManager;
}

TodoList(sampleManagerCreator());

