import { formatDate } from "./utils.js"

const mainGridContainer = () => document.getElementById("main-grid-container")

// GENERAL

function clearMainGridContainer() {
    while (mainGridContainer().firstChild) {
        mainGridContainer().removeChild(mainGridContainer().lastChild)
    }
}

// PROJECT UI

export function createProject(project) {
    const container = document.createElement("div")
    container.classList.add("project-container")

    setProjectName(project, container)
    setProjectTotalToDoItems(project, container)

    mainGridContainer().appendChild(container)
}

function setProjectName(project, container) {
    const name = document.createElement("p")
    name.classList.add("project-name")
    name.textContent = project.getProjectName()
    
    container.appendChild(name)
}

function setProjectTotalToDoItems(project, container) {
    const name = document.createElement("p")
    name.classList.add("project-total-items")
    name.textContent = project.getToDoItemsList().length
    
    container.appendChild(name)
}

// TO DO UI

export function createToDoItem(toDo) {
    const container = document.createElement("div")
    container.classList.add("to-do-container")

    setToDoTitle(toDo, container)
    setToDoDescription(toDo, container)
    setToDoDueDate(toDo, container)
    setToDoCompleted(toDo, container)

    mainGridContainer().appendChild(container)
}

function setToDoTitle(toDo, container) {
    const title = document.createElement("p")
    title.classList.add("to-do-title")
    title.textContent = toDo.getTitle()
    
    container.appendChild(title)
}

function setToDoDescription(toDo, container) {
    const description = document.createElement("p")
    description.classList.add("to-do-description")
    description.textContent = toDo.getDescription()
    
    container.appendChild(description)
}

function setToDoDueDate(toDo, container) {
    const dueDate = document.createElement("p")
    dueDate.classList.add("to-do-due-date")
    dueDate.textContent = formatDate(toDo.getDueDate())
    
    container.appendChild(dueDate)
}
   
function setToDoCompleted(toDo, container) {
    const completed = document.createElement("input")
    completed.type = "checkbox"
    completed.classList.add("to-do-completed")
    completed.checked = toDo.getCompleted()

    const toDoId = toDo.getId()
    completed.id = `completed-${toDoId}`
    completed.name = `completed-${toDoId}`

    container.appendChild(completed)
}