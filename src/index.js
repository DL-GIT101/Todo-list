import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";

const sampleTodos = [
    ["Complete Report", "Finish the quarterly report for the team meeting", "02-15-24", "High", "Work"],
    ["Buy Groceries", "Pick up fruits, vegetables, and bread", "03-02-24", "Medium", "Chores"],
    ["Call Mom", "Check in with Mom and wish her a happy birthday", "04-18-24", "Low", "Work"],
    ["Pay Bills", "Pay electricity, water, and internet bills", "05-10-24", "High", "Work"],
    ["Plan Vacation", "Research destinations and book accommodations", "06-25-24", "Medium", "Chores"],
    ["Finish Presentation", "Finalize slides for upcoming client meeting", "07-12-24", "High", "Work"],
    ["Exercise", "Go for a run or do a workout session", "08-05-24", "Medium", "Chores"],
    ["Read Book", "Spend an hour reading the latest novel", "09-20-24", "Low", "Work"],
    ["Write Blog Post", "Draft content for next week's blog post", "10-08-24", "High", "Work"],
    ["Clean Garage", "Organize tools and declutter garage space", "11-30-24", "Medium", "Chores"]
  ];

const managerDOM = () => {

    const _manager = createManager();
    _manager.addProject("Default");
    _manager.addProject("Work");

    const body = document.querySelector('body');

    const updateScreen = () => {

        body.textContent = '';

        const allProjects = _manager.getProjects();

        const projectButton = (buttonText) => {
            let button = document.createElement("button");
            button.className = "project button";
            button.textContent = buttonText;

            return button;
        } 

        allProjects.forEach(project => body.appendChild(projectButton(project.getTitle())));

        console.log(allProjects);

    }

    updateScreen();
}

managerDOM();

