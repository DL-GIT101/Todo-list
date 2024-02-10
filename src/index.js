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

    const manager = createManager();

    const updateScreen = () => {
        const  sidebar = document.querySelector(".sidebar")
        // for the "All" todos
        const projectAllButton = document.createElement("button");
        projectAllButton.className = "project";
        projectAllButton.textContent = "All";
        projectAllButton.addEventListener("click",() => displayProjectTodos(manager.getAllTodos()));
        sidebar.appendChild(projectAllButton);

        displayProject(manager.getProjects());
        
    }

    const layout = () => {
        const body = document.querySelector('body');

        const container = document.createElement("div");
        container.className = "main";
        
        const sidebar = document.createElement("div");
        sidebar.className = "sidebar";
        
        const board = document.createElement("div");
        board.className = "board";
        container.append(sidebar,board);
        body.append(container);
    }

    const displayProject = (manager) => {
        const sidebar = document.querySelector(".sidebar");
        manager.forEach(project => {
            
            let button = document.createElement("button");
            button.className = "project";
            button.textContent = project.getTitle();
            button.addEventListener("click",() => displayProjectTodos(project.getTodos()));
            sidebar.appendChild(button);
        });
    }

    const displayProjectTodos = (todos) => {
        const board = document.querySelector(".board");
        board.textContent = '';

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
            board.appendChild(div);
        })
    }
    

    initialDataLoad(manager);
    layout();
    updateScreen();
}

screenController();

