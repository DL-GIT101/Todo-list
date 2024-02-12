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
        displayProject(manager);
        
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
        const board = document.querySelector(".board");
        const sidebar = document.querySelector(".sidebar");
        board.textContent = sidebar.textContent = '';

        // for "All" todos
        const allButton = document.createElement("button");
        allButton.className = "project";
        allButton.textContent = "All";
        allButton.addEventListener("click",() =>{ 
            board.textContent = '';
            displayProjectTodos(manager.getAllTodos())
        });
        sidebar.appendChild(allButton);

        const projects = manager.getProjects();

        projects.forEach(project => {
            
            const button = document.createElement("button");
            button.className = "project";
            button.textContent = project.getTitle();
            button.addEventListener("click",() => {
                board.textContent = '';
                projectTitle(project.getTitle()); 
                displayProjectTodos(project.getTodos());
            });
            
            sidebar.appendChild(button);
        });

        //add button
        const addButton = document.createElement("button");
        addButton.className = "project";
        addButton.textContent = "+";
        addButton.addEventListener("click", () => {
            manager.addProject("Title");
            updateScreen();
        })
        sidebar.appendChild(addButton);

        const displayProjectTodos = (todos) => {
    
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

        const projectTitle = (projectTitle) => {
            const div = document.createElement("div");
            div.className = "title";
            const title = document.createElement('p');
            title.textContent = projectTitle.toUpperCase();
            div.appendChild(title);

            const operators  = ["edit","delete"];
            operators.forEach(operator => {
                const button = document.createElement("button");
                button.className = `operator ${operator}`;
                button.textContent = operator;
                div.appendChild(button);
            })
            
            board.appendChild(div);
        }

    }

    initialDataLoad(manager);
    layout();
    updateScreen();
}

screenController();

