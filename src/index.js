import "./style.css"
import ToDoItem from "./to-do-item.js"
import Project from "./project.js"
import ProjectsManager from "./projects-manager.js"
import { displayProject, displayAllProjects } from "./ui.js"

export let projectsManager = null

window.addEventListener("load", () => {
    
    projectsManager = ProjectsManager()

    const defaultProject = Project({projectName: "Default Project"})
    projectsManager.addProject(defaultProject)

    const toDo = ToDoItem({
        itemTitle: "New ToDo", 
        itemDescription: "The first ToDo",
        itemDueDate: new Date("2024-11-01")
    })

    const toDo2 = ToDoItem({
        itemTitle: "New ToDo 2",
        itemDescription: "Another to do", 
        itemDueDate: new Date("2022-01-02")
    })

    const toDo3 = ToDoItem({
        itemTitle: "New ToDo 3", 
        itemDescription: "machú",
        itemDueDate: new Date("2023-05-23")
    })

    defaultProject.addToDoItem(toDo)
    defaultProject.addToDoItem(toDo2)
    defaultProject.addToDoItem(toDo3)

    displayAllProjects(projectsManager.getProjectsList())
})

