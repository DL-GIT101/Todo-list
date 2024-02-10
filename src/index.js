import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';

  const initialDataLoad = (manager) => {
    manager.addProject("Chore");
    manager.addProject("Work");

    const projects = manager.getProjects();

    projects[0].addTodo(createTODO("Buy Groceries","Pick up fruits, vegetables, and bread", "03-02-24", "Medium"));
    projects[0].addTodo(createTODO("Plan Vacation", "Research destinations and book accommodations", "06-25-24", "Medium"));
    projects[1].addTodo(createTODO("Complete Report", "Finish the quarterly report for the team meeting", "02-15-24", "High"));
    projects[1].addTodo(createTODO("Call Mom", "Check in with Mom and wish her a happy birthday", "04-18-24", "Low"));
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
        // for the "All" todos
        const projectAllButton = document.createElement("button");
        projectAllButton.className = "project";
        projectAllButton.textContent = "All";
        projectAllButton.addEventListener("click",() => displayProjectTodos(manager.getAllTodos()));
        mainSideBar.appendChild(projectAllButton);

        const allProjects = manager.getProjects();

        allProjects.forEach(project => {
            
            let button = document.createElement("button");
            button.className = "project";
            button.textContent = project.getTitle();
            button.addEventListener("click",() => displayProjectTodos(project.getTodos()));
            mainSideBar.appendChild(button);
        });
        
    }

    const displayProjectTodos = (todos) => {
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

