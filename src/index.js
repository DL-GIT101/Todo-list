import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';

//         const displayAllTodos = (todos) => {

//             todos.forEach(todo => {
//                 const container = document.createElement("container");
//                 container.className = "todo";
//                 const div = document.createElement("div");
//                 div.className = "details";
        
//                 const title = document.createElement("p");
//                 title.className = "title";
//                 title.textContent = todo.getTitle();
        
//                 const dueDate = document.createElement("p");
//                 dueDate.className = "dueDate";
//                 dueDate.textContent = todo.getDueDate();
        
//                 //style depending on piority
//                 container.classList.add((todo.getPriority()).toLowerCase());

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

const displayProjectList = (manager) => {

    const projectListUl = document.createElement("UL");
    projectListUl.className = "manager list";

    const projects = manager.getProjects();
    projects.forEach((project, index) => {

        const projectLi = document.createElement("li");
        projectLi.className = "project";
        projectLi.setAttribute("projectIndex",index);

        const projectWrapper = createDiv("wrapper");

        const titleHolder = createDiv("title-holder");

        const title = document.createElement('p');
        title.className = "title";
        title.textContent = project.getTitle();

        titleHolder.appendChild(title)
        projectWrapper.appendChild(titleHolder);
        projectLi.append(projectWrapper);

        projectListUl.appendChild(projectLi);
    });

    return projectListUl;
}

const updateProjectList = (manager, container) => {
    const newProjectList = displayProjectList(manager);
    container.replaceChild(newProjectList, container.childNodes[1]);
}

const displayProjectTitle = (project, index) => {

    const header = document.createElement("header");
    header.className = "project";
    header.setAttribute("projectIndex",index);

    const projectTitle = document.createElement('p');
    projectTitle.className = "title";
    projectTitle.textContent = project.getTitle().toUpperCase();

    const renameButton = createButton("rename", "rename");

    header.append(projectTitle, renameButton);

    return header;
}

const displayProjectTodos = (todos) => {

    const todoUl = document.createElement("UL");
    todoUl.className = "todo-list";

    todos.forEach((todo, index) => {

        const todoLi = document.createElement("li");
        todoLi.className = "todo";
        todoLi.setAttribute("todoIndex",index);

        const todoWrapper = createDiv("wrapper");

        const details = document.createElement("div");
        details.className = "details";

        const title = document.createElement("p");
        title.className = "title";
        title.textContent = todo.getTitle();

        const dueDate = document.createElement("p");
        dueDate.className = "dueDate";
        dueDate.textContent = todo.getDueDate();

        //style depending on piority
        details.classList.add((todo.getPriority()).toLowerCase());

        details.append(title,dueDate);

        const editButton = createButton("edit","edit");
        const deleteButton = createButton("delete", "delete");
        todoWrapper.append(details,editButton,deleteButton);
        todoLi.appendChild(todoWrapper);
        todoUl.appendChild(todoLi);
    });

    return todoUl;
}

const  displayProject = (project, board) => {
    board.textContent = '';

    const titleProjectContainer = document.createElement("div");
    titleProjectContainer.className = "title";

    const titleProject = document.createElement('p');
    titleProject.textContent = project.getTitle().toUpperCase();
    titleProjectContainer.appendChild(titleProject);
    board.append(titleProjectContainer);

    const deleteButton = createButton("delete", "delete");
    deleteButton.addEventListener("click", () => {
        manager.deleteProject(project);
        displayProjectList(manager);
    });
    titleProjectContainer.appendChild(deleteButton);

}

const resetClickedList = (ListSelector,elementToRemoveSelector,classNameAdded) => {
    const clickedList = document.querySelector(ListSelector);
    if(clickedList){
        clickedList.classList.remove(classNameAdded);
        const toBeRemoveElement = clickedList.querySelector(elementToRemoveSelector);
        clickedList.removeChild(toBeRemoveElement);
    }
    
    
}

const TodoList = (manager) => {

    const body = document.querySelector('body');

    const main = document.createElement("container");
    main.className = "main";
    
    const sidebar = document.createElement("aside");
    sidebar.className = "sidebar";
    
    const board = document.createElement("section");
    board.className = "board";
    main.append(sidebar,board);
    body.append(main);

    //sidebar

    const managerAllTodosBtn = createButton("manager all","All");
    sidebar.appendChild(managerAllTodosBtn);

    const projectList = displayProjectList(manager);
    sidebar.appendChild(projectList);

    const managerAddProjectBtn = createButton("manager add", "+");
    sidebar.appendChild(managerAddProjectBtn);

    sidebar.addEventListener("click", (event) => {
        const target = event.target;
        const projects = manager.getProjects();

        if(target.matches(".manager.all")){
            //all button
            board.textContent = "";
            resetClickedList(".manager > .project > .wrapper.clicked",".delete","clicked");
            const title = document.createElement('p');
            title.className = "all";
            title.textContent = "Todos";
            const allTodos = manager.getAllTodos();
            const allTodosUl = displayProjectTodos(allTodos);
            board.append(title,allTodosUl);

        }else if(target.matches(".manager.add")){
            //add button
            const newProject = createProject("New");
            manager.addProject(newProject);
            updateProjectList(manager,sidebar);
            //add delete button to latest project
            const lastProjectLi = sidebar.childNodes[1].lastElementChild;
            const wrapper = lastProjectLi.childNodes[0];
            wrapper.classList.add("clicked");
            const deleteButton = createButton("delete", "delete");
            wrapper.appendChild(deleteButton);
            const projectIndex = lastProjectLi.getAttribute("projectIndex");
            //display the projectTitle
            const projectTitle = displayProjectTitle(projects[projectIndex],projectIndex);
            board.textContent = "";
            board.appendChild(projectTitle);

        }else if(target.closest(".title-holder")){
            //append delete button
            resetClickedList(".manager > .project > .wrapper.clicked",".delete","clicked");
            target.closest(".wrapper").classList.add("clicked");
            const deleteButton = createButton("delete", "delete");
            target.closest(".wrapper").appendChild(deleteButton);
            //append project title on board
            const projectIndex = target.closest("li.project").getAttribute("projectIndex");
            const projectTitle = displayProjectTitle(projects[projectIndex],projectIndex);
            const projectTodos = displayProjectTodos(projects[projectIndex].getTodos());
            board.textContent = "";
            board.append(projectTitle,projectTodos);

        }else if(target.matches(".manager > .project > .wrapper.clicked > .delete")){
            //delete a project
            const projectIndex = target.closest("li.project").getAttribute("projectIndex");
            manager.deleteProject(projects[projectIndex]);
            updateProjectList(manager,sidebar);
        }
    });

    board.addEventListener("click", (event) => {
        const target = event.target;
        console.log(target);
        const projects = manager.getProjects();

        if(target.matches(".board > .project > .rename")){
            //get current project obj
            const header = target.closest(".project");
            const currentProject = projects[header.getAttribute("projectIndex")];
            //create input 
            const input = document.createElement("input");
            input.type = "text";
            input.id = "projectTitle";
            input.value = currentProject.getTitle();
            header.replaceChild(input, header.childNodes[0]);
            //add submit button
            const okButton = createButton("submit", "ok");
            header.replaceChild(okButton,header.childNodes[1]);
        }else if(target.matches(".board > .project > .submit")){
            //get input value
            const header = target.closest(".project");
            const projectIndex = header.getAttribute("projectIndex");
            const currentProject = projects[projectIndex];
            const input = header.childNodes[0];
            //ser input value
            currentProject.setTitle(input.value);
            //update the title
            const projectTitle = displayProjectTitle(currentProject,projectIndex);
            board.textContent = "";
            board.appendChild(projectTitle);
            //update title in sidebar
            const currentProjectLi = sidebar.childNodes[1].childNodes[projectIndex];
            const title = currentProjectLi.childNodes[0].childNodes[0].childNodes[0];
            title.textContent = input.value;
        }else if(target.closest(".board > .todo-list > .todo > .wrapper > .details")){
            const expandedTodo = document.querySelector(".board > .todo-list > .todo.expand");
            if(expandedTodo){
                expandedTodo.classList.remove("expand");
            }
            target.closest(".todo").classList.add("expand");
        }
    });

}   

const sampleManagerCreator = () => {

    const sampleManager = createManager();

    const workProject = createProject("Work");
    const choreProject = createProject("Project");

    const todo1 = createTODO("Buy Groceries","Pick up fruits, vegetables, and bread", "03-02-24", "Medium");
    const todo2 = createTODO("Plan Vacation", "Research destinations and book accommodations", "06-25-24", "Medium");
    const todo3 = createTODO("Complete Report", "Finish the quarterly report for the team meeting", "02-15-24", "High");
    const todo4 = createTODO("Call Mom", "Check in with Mom and wish her a happy birthday", "04-18-24", "Low");

    choreProject.addTodo(todo1);
    choreProject.addTodo(todo4);
    workProject.addTodo(todo2);
    workProject.addTodo(todo3);

    sampleManager.addProject(workProject);
    sampleManager.addProject(choreProject);

    return sampleManager;
}

TodoList(sampleManagerCreator());

