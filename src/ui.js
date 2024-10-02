import { formatDate } from "./utils.js"
import { projectsManager } from "./index.js"
import Project from "./project.js"
import ToDoItem from "./to-do-item.js"

let currentProject = null

const mainGridContainer = () => document.getElementById("main-grid-container")

const mainTitle = () => document.getElementById("main-title")

const backButton = () => document.getElementById("back-button")

const newProjectButton = () => document.getElementById("new-project-button")

const newToDoButton = () => document.getElementById("new-to-do-button")

const newProjectForm = () => document.forms[0]
const newProjectModal = () => document.getElementById("new-project-modal")

const newToDoForm = () => document.forms[1]
const newToDoModal = () => document.getElementById("new-to-do-modal")

const cancelNewProjectButton = () => document.getElementById("cancel-new-project-button")

const cancelNewToDoButton = () => document.getElementById("cancel-new-to-do-button")

// BUTTONS

backButton().addEventListener("click", () => displayAllProjects(projectsManager.getProjectsList()))

newProjectButton().addEventListener("click", () => {
    clearForm(newProjectForm())
    newProjectModal().showModal()
})

newToDoButton().addEventListener("click", () => {
    clearForm(newToDoForm())
    newToDoModal().showModal()
})

// GENERAL

function clearMainGridContainer() {
    while (mainGridContainer().firstChild) {
        mainGridContainer().removeChild(mainGridContainer().lastChild)
    }
}

function changeMainTitle(newTitle, color) {
    mainTitle().textContent = newTitle

    mainTitle().classList.remove(...mainTitle().classList)
    mainTitle().classList.add(`text-color-${color}`)
}

function showBackButton() {
    backButton().classList.remove("hidden")
}

function hideBackButton() {
    backButton().classList.add("hidden")
}

function showNewProjectButton() {
    newProjectButton().classList.remove("hidden")
}

function hideNewProjectButton() {
    newProjectButton().classList.add("hidden")
}

function showNewToDoButton() {
    newToDoButton().classList.remove("hidden")
}

function hideNewToDoButton() {
    newToDoButton().classList.add("hidden")
}

function clearForm(form) {
    form.reset()
}

export function displayAllProjects(projectsList) {
    currentProject = null

    clearMainGridContainer()

    hideBackButton()
    showNewProjectButton()
    hideNewToDoButton()
    
    changeMainTitle("Your Projects", "dark")

    for (const project of projectsList) {
        displayProject(project)
    }
}

// PROJECT FORM 

cancelNewProjectButton().addEventListener("click", () => {
    newProjectModal().close()
})

newProjectForm().addEventListener("submit", (event) => {
    
    event.preventDefault()
    event.stopPropagation()
    newProjectModal().close()

    let formData = new FormData(event.target)

    const newProject = Project({projectName: formData.get("projectNameInput").toString()})
    projectsManager.addProject(newProject)
    
    displayAllProjects(projectsManager.getProjectsList())
})

// TO DO FORM 

cancelNewToDoButton().addEventListener("click", () => {
    newToDoModal().close()
})

newToDoForm().addEventListener("submit", (event) => {
    
    event.preventDefault()
    event.stopPropagation()
    newToDoModal().close()

    let formData = new FormData(event.target)

    const newToDo = ToDoItem({
        itemTitle: formData.get("toDoTitleInput").toString(), 
        itemDescription: formData.get("toDoDescriptionInput").toString(), 
        itemDueDate: new Date(formData.get("toDoDueDateInput"))
    })

    if (currentProject == null) {
        throw new Error("There should be a current project assigned")
    }
    currentProject.addToDoItem(newToDo)
    
    displayAllToDoItemsFromProject(currentProject)
})

// PROJECT UI

export function displayProject(project) {
    const container = document.createElement("div")
    container.classList.add("project-container")
    container.addEventListener('click', () => displayAllToDoItemsFromProject(project))

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

function displayAllToDoItemsFromProject(project) {
    currentProject = project

    clearMainGridContainer()

    showBackButton()
    hideNewProjectButton()
    showNewToDoButton()
    
    changeMainTitle(project.getProjectName(), "primary")

    for (const toDoItem of project.getToDoItemsList()) {
        displayToDoItem(toDoItem)
    }
}

// TO DO UI

export function displayToDoItem(toDo) {
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