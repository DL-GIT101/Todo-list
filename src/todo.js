const createTODO = (title, description, dueDate, priority) => {
    
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _project = "Default";

    const todo = {
        getTitle: () => _title,
        setTitle: (newTitle) => { _title = newTitle; },
        getDescription: () => _description,
        setDescription: (newDescription) => { _description = newDescription; },
        getDueDate: () => _dueDate,
        setDueDate: (newDueDate) => { _dueDate = newDueDate; },
        getPriority: () => _priority,
        setPriority: (newPriority) => { _priority = newPriority; },
        getProject: () => _project,
        setProject: (newProject) => { _project = newProject}
    };

    return todo;
} 

export {createTODO};