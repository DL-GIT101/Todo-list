import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';
import { add } from 'lodash';

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

    const displayProjectList = (manager) => {
        const board = document.querySelector(".board");
        const sidebar = document.querySelector(".sidebar");
        board.textContent = sidebar.textContent = '';
        
        const allTodosButton = () => {

            const button = document.createElement("button");
            button.className = "project";
            button.textContent = "All";
            button.addEventListener("click",() => { 
                displayProject("all");
            });
            sidebar.appendChild(button);
        }

        const projectButtons = (projects) => {
            projects.forEach(project => {
            
                const button = document.createElement("button");
                button.className = "project";
                button.textContent = project.getTitle();
                button.addEventListener("click",() => {
                    displayProject(project);
                });
                
                sidebar.appendChild(button);
            });
        }

        const addProjectButton = () => {
            const button = document.createElement("button");
            button.className = "project";
            button.textContent = "+";
            button.addEventListener("click", () => {
                manager.addProject("Title");
                displayProjectList(manager);
            })
            sidebar.appendChild(button);
        }

        allTodosButton();
        projectButtons(manager.getProjects());
        addProjectButton();
    }

    const displayProject = (project) => {
        const board = document.querySelector(".board");
        board.textContent = '';

        const title = () => {
            const div = document.createElement("div");
            div.className = "title";
            const title = document.createElement('p');
            title.textContent = project.getTitle().toUpperCase();
            div.appendChild(title);

            const renameButton = () => {
                const button = document.createElement("button");
                button.className = button.textContent = "rename";
                button.addEventListener("click", () => {
                    div.textContent = '';
                    const input = document.createElement("input");
                    input.type = "text";
                    input.id = "projectTitle";
                    input.value = project.getTitle();
                    
                    const button = document.createElement("button");
                    button.className = "submit";
                    button.textContent = "OK";
                    button.addEventListener("click", () => {
                        project.setTitle(input.value);
                        displayProjectList(manager);
                        displayProject(project);
                    });
                    div.append(input,button);
                });
                div.appendChild(button);
            }

            const deleteButton = () => {
                const button = document.createElement("button");
                button.className = button.textContent = "delete";
                button.addEventListener("click", () => {
                    manager.deleteProject(project);
                    displayProjectList(manager);
                });
                div.appendChild(button);
            }

            renameButton();
            deleteButton();

            board.appendChild(div);
        }

        const todos = (todos) => {

            const todoButton = (todos) => {
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

                    div.addEventListener("click", () => {
                        
                        const displayTodoDetails = () => {
                            div.textContent = '';
                            const details = {
                                "project":todo.getProject(),
                                "title":todo.getTitle(),
                                 "description":todo.getDescription(),
                                "dueDate": todo.getDueDate(),
                                "priority":todo.getPriority(),
                                };

                            for (let detail in details) {
                                const p = document.createElement('p');
                                p.className = detail;
                                p.textContent = details[detail];

                                if(detail === "project"){
                                    if(project === "all"){
                                        div.appendChild(p);
                                    }else{

                                    }
                                }else {
                                    div.appendChild(p);
                                }
                            }
                        }

                        const editButton = () => {
                            const button = document.createElement("button");
                            button.className = button.textContent = "edit";
                            button.addEventListener("click", () => {
                                
                            });
                            div.appendChild(button);
                        }
            
                        const deleteButton = () => {
                            const button = document.createElement("button");
                            button.className = button.textContent = "delete";
                            button.addEventListener("click", () => {
                                
                            });
                            div.appendChild(button);
                        }
                        div.classList.add("expanded");
                        displayTodoDetails();
                        editButton();
                        deleteButton();
                    });
        
                    div.append(title,dueDate);
                    board.appendChild(div);
                });
            }

            const addButton = () => {
                const div = document.createElement("div");
                div.className = "todo add";
            
                const title = document.createElement("p");
                title.className = "title";
                title.textContent = "+";
                div.appendChild(title);
                board.appendChild(div);
            }

            todoButton(todos);
            addButton();
        }

        if(project === "all"){
            todos(manager.getAllTodos());
        }else {
            title();
            todos(project.getTodos());
        }
    }

    initialDataLoad(manager);
    layout();
    displayProjectList(manager);
    displayProject("all");
}

screenController();

