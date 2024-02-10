import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';

  const initialDataLoad = (manager) => {
    manager.addProject("All");
    manager.addProject("Chore");
    manager.addProject("Work");

    const projects = manager.getProjects();

    projects[1].addTodo(createTODO("Buy Groceries","Pick up fruits, vegetables, and bread", "03-02-24", "Medium"));
    projects[1].addTodo(createTODO("Plan Vacation", "Research destinations and book accommodations", "06-25-24", "Medium"));
    projects[2].addTodo(createTODO("Complete Report", "Finish the quarterly report for the team meeting", "02-15-24", "High"));
    projects[2].addTodo(createTODO("Call Mom", "Check in with Mom and wish her a happy birthday", "04-18-24", "Low"));

    const allTodos = manager.getAllTodos();
    allTodos.forEach(todo => projects[0].addTodo(todo));
}

const screenController = () => {

    const body = document.querySelector('body');

    const mainContainer = document.createElement("div");
    mainContainer.className = "main";
    
    const mainSideBar = document.createElement("div");
    mainSideBar.className = "sidebar";
    
    const mainBoard = document.createElement("div");
    mainBoard.className = "board";
    mainContainer.append(mainSideBar,mainBoard);
    body.append(mainContainer);

    const manager = createManager();

    const updateScreen = () => {

        const allProjects = manager.getProjects();

        allProjects.forEach(project => {
            
            let button = document.createElement("button");
            button.className = "project";
            button.textContent = project.getTitle();
            button.addEventListener("click",() => getProjectAllTodo(project));
            mainSideBar.appendChild(button);
        });
        
    }

    const getProjectAllTodo = (project) => {
        const todos = project.getTodos();
        mainBoard.textContent = '';

        todos.forEach(todo => {
            
            const div = document.createElement("div");
            div.className = "todo";

            const title = document.createElement("p");
            title.className = "title";
            title.textContent = todo.getTitle();

            const dueDate = document.createElement("p");
            dueDate.className = "dueDate";
            dueDate.textContent = todo.getDueDate();

            //style depending on piority
            div.classList.add((todo.getPriority()).toLowerCase());

            div.append(title,dueDate);
            mainBoard.appendChild(div);
        })
    }
    

    initialDataLoad(manager);
    updateScreen();
}

screenController();

