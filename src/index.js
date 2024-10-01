import "./style.css"
import ToDoItem from "./to-do-item.js"
import Project from "./project.js"
import ProjectsManager from "./projects-manager.js"
import { showAllProjects } from "./ui.js"

window.addEventListener("load", () => {
    
    const projectsManager = ProjectsManager()

    const defaultProject = Project({projectName: "Default Project"})
    projectsManager.addProject(defaultProject)
    const emptyProject = Project({projectName: "Empty Project"})
    projectsManager.addProject(emptyProject)

    const toDo = ToDoItem({
        itemTitle: "New ToDo", 
        itemDescription: "The first ToDo",
        itemDueDate: new Date(2024, 11, 1)
    })

    const toDo2 = ToDoItem({
        itemTitle: "New ToDo 2", 
        itemDueDate: new Date(2022, 1, 2)
    })

    const toDo3 = ToDoItem({
        itemTitle: "New ToDo 3", 
        itemDueDate: new Date(2023, 5, 23)
    })

    defaultProject.addToDoItem(toDo)
    defaultProject.addToDoItem(toDo2)
    defaultProject.addToDoItem(toDo3)

    showAllProjects(projectsManager.getProjectsList())
})

