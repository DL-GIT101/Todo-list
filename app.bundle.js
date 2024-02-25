/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/manager.js


const createManager = () => {

    let _allProjects = [];

    const manager = {
        getProjects: () => _allProjects,
        addProject: (project) => _allProjects.push(project),
        deleteProject: (projectToBeRemove) => _allProjects = _allProjects.filter(project => project !== projectToBeRemove),
    }

    return manager;
}


;// CONCATENATED MODULE: ./src/index.js



const sampleTodos = (/* unused pure expression or super */ null && ([
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
  ]));

const managerDOM = () => {

    const _manager = createManager();

    const body = document.querySelector('body');

    const updateScreen = () => {

        body.textContent = '';

        const allProjects = _manager.getProjects();

        allProjects.forEach(project => console.log(project.getName()));
    }

    updateScreen();
}

managerDOM();


/******/ })()
;
//# sourceMappingURL=app.bundle.js.map