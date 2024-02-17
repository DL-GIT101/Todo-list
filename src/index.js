import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';

// const screenController = () => {

//             const renameButton = () => {
//                 const button = document.createElement("button");
//                 button.className = button.textContent = "rename";
//                 button.addEventListener("click", () => {
//                     container.textContent = '';
//                     const input = document.createElement("input");
//                     input.type = "text";
//                     input.id = "projectTitle";
//                     input.value = project.getTitle();
                    
//                     const button = document.createElement("button");
//                     button.className = "submit";
//                     button.textContent = "OK";
//                     button.addEventListener("click", () => {
//                         project.setTitle(input.value);
//                         displayProjectList(manager);
//                         displayProject(project);
//                     });
//                     container.append(input,button);
//                 });
//                 container.appendChild(button);
//             }

//            

//             renameButton();
//             deleteButton();

//             board.appendChild(container);
//         }

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
    projects.forEach(project => {

        const projectLi = document.createElement("li");
        projectLi.className = "project";

        const projectWrapper = createDiv("wrapper");

        const title = document.createElement('p');
        title.className = "title";
        title.textContent = project.getTitle();

        // projectDiv.addEventListener("click", () => {
        //     managerDiv.classList.add("clicked");

        //     const deleteButton = createButton("delete", "delete");
        //     deleteButton.addEventListener("click",() => {
        //         manager.deleteProject(project);
        //         displayProjectList(manager,sidebar);
        //     });
        //     managerDiv.appendChild(deleteButton);
        // });

        projectWrapper.appendChild(title);
        projectLi.append(projectWrapper);

        projectListUl.appendChild(projectLi);
    });

    return projectListUl;
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
    const lists = document.querySelectorAll(ListSelector);
    lists.forEach(list => {
        const toBeRemoveElement = list.querySelector(elementToRemoveSelector);
        list.removeChild(toBeRemoveElement);
        list.classList.remove(classNameAdded);
    });
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
        console.log(target);

        if(target.matches(".manager.all")){

            console.log(manager.getAllTodos());

        }else if(target.matches(".manager.add")){

            const newProject = createProject("New");
            manager.addProject(newProject);
            const newProjectList = displayProjectList(manager);
            sidebar.replaceChild(newProjectList, sidebar.childNodes[1]);
        }else if(target.matches(".manager > .project > .wrapper")){
            resetClickedList(".manager > .project > .wrapper.clicked",".delete","clicked");
            target.classList.add("clicked");
            const deleteButton = createButton("delete", "delete");
            target.appendChild(deleteButton);
            
        }else if(target.closest(".wrapper")){
            resetClickedList(".manager > .project > .wrapper.clicked",".delete","clicked");
            target.closest('.wrapper').classList.add("clicked");
            const deleteButton = createButton("delete", "delete");
            target.closest('.wrapper').appendChild(deleteButton);
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

