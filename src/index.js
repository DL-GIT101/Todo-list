import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';
import { add, sample } from 'lodash';

// const screenController = () => {

//     const manager = createManager();

//     const layout = () => {
//         const body = document.querySelector('body');

//         const container = document.createElement("div");
//         container.className = "main";
        
//         const sidebar = document.createElement("div");
//         sidebar.className = "sidebar";
        
//         const board = document.createElement("div");
//         board.className = "board";
//         container.append(sidebar,board);
//         body.append(container);
//     }

//     const displayProjectList = (manager) => {
//         const board = document.querySelector(".board");
//         const sidebar = document.querySelector(".sidebar");
//         board.textContent = sidebar.textContent = '';
        
//         const allTodosButton = () => {

//             const button = document.createElement("button");
//             button.className = "project";
//             button.textContent = "All";
//             button.addEventListener("click",() => { 
//                 displayProject("all");
//             });
//             sidebar.appendChild(button);
//         }

//         const projectButtons = (projects) => {
//             projects.forEach(project => {
            
//                 const button = document.createElement("button");
//                 button.className = "project";
//                 button.textContent = project.getTitle();
//                 button.addEventListener("click",() => {
//                     displayProject(project);
//                 });
                
//                 sidebar.appendChild(button);
//             });
//         }

//         const addProjectButton = () => {
//             const button = document.createElement("button");
//             button.className = "project";
//             button.textContent = "+";
//             button.addEventListener("click", () => {
//                 manager.addProject("Title");
//                 displayProjectList(manager);
//             })
//             sidebar.appendChild(button);
//         }

//         allTodosButton();
//         projectButtons(manager.getProjects());
//         addProjectButton();
//     }

//     const displayProject = (project) => {
//         const board = document.querySelector(".board");
//         board.textContent = '';

//         const title = () => {
//             const container = document.createElement("container");
//             container.className = "title";
//             const title = document.createElement('p');
//             title.textContent = project.getTitle().toUpperCase();
//             container.appendChild(title);

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

//             const deleteButton = () => {
//                 const button = document.createElement("button");
//                 button.className = button.textContent = "delete";
//                 button.addEventListener("click", () => {
//                     manager.deleteProject(project);
//                     displayProjectList(manager);
//                 });
//                 container.appendChild(button);
//             }

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

const TodoList = () => {

    const sampleManager = sampleManagerCreator();

    
}

TodoList();

