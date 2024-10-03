import { formatDate } from "./utils.js"
import { projectsManager } from "./index.js"
import Project from "./project.js"
import ToDoItem from "./to-do-item.js"

let currentOpenProject = null
let currentEditingProject = null
let currentEditingToDo = null

const mainGridContainer = () => document.getElementById("main-grid-container")

const mainTitle = () => document.getElementById("main-title")

const backButton = () => document.getElementById("back-button")

const newProjectButton = () => document.getElementById("new-project-button")

const newToDoButton = () => document.getElementById("new-to-do-button")

const newProjectForm = () => document.forms[0]
const newProjectModal = () => document.getElementById("new-project-modal")

const newToDoForm = () => document.forms[1]
const newToDoModal = () => document.getElementById("new-to-do-modal")

const editProjectForm = () => document.forms[2]
const editProjectModal = () => document.getElementById("edit-project-modal")
const editProjectNameInput = () => document.getElementById("edit-project-name-input")

const editToDoForm = () => document.forms[3]
const editToDoModal = () => document.getElementById("edit-to-do-modal")
const editToDoTitleInput = () => document.getElementById("edit-to-do-title-input")
const editToDoDescriptionInput = () => document.getElementById("edit-to-do-description-input")
const editToDoDueDateInput = () => document.getElementById("edit-to-do-due-date-input")

const cancelNewProjectButton = () => document.getElementById("cancel-new-project-button")

const cancelNewToDoButton = () => document.getElementById("cancel-new-to-do-button")

const cancelEditProjectButton = () => document.getElementById("cancel-edit-project-button")

const cancelEditToDoButton = () => document.getElementById("cancel-edit-to-do-button")

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
    mainGridContainer().classList.remove(...mainGridContainer().classList)
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

function displayMessage(message) {
    mainGridContainer().textContent = message
    mainGridContainer().classList.add("text-color-alert", "text-alert")
}

export function displayAllProjects(projectsList) {
    currentOpenProject = null

    clearMainGridContainer()

    hideBackButton()
    showNewProjectButton()
    hideNewToDoButton()
    
    changeMainTitle("Your Projects", "dark")

    if (projectsList.length <= 0) {
        displayMessage("There are no projects")
    } else {
        for (const project of projectsList) {
            displayProject(project)
        }    
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

cancelEditProjectButton().addEventListener("click", () => {
    currentEditingProject = null
    editProjectModal().close()
})

editProjectForm().addEventListener("submit", (event) => {
    event.preventDefault()
    event.stopPropagation()
    editProjectModal().close()

    let formData = new FormData(event.target)

    currentEditingProject.updateProjectName(formData.get("editProjectNameInput"))
    
    displayAllProjects(projectsManager.getProjectsList())

    currentEditingProject = null
})

function showEditProjectFormWithValues(project) {
    currentEditingProject = project

    editProjectNameInput().value = project.getProjectName()
}

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

    if (currentOpenProject == null) {
        throw new Error("There should be a current project assigned")
    }
    currentOpenProject.addToDoItem(newToDo)
    
    displayAllToDoItemsFromProject(currentOpenProject)
})

cancelEditToDoButton().addEventListener("click", () => {
    currentEditingToDo = null
    editToDoModal().close()
})

function showEditToDoFormWithValues(toDo) {
    currentEditingToDo = toDo

    editToDoTitleInput().value = toDo.getTitle()
    editToDoDescriptionInput().value = toDo.getDescription()
    console.log(toDo.getDueDate())
    editToDoDueDateInput().value = toDo.getDueDate()
    console.log(editToDoDueDateInput().value) //TODO: not working
}

// PROJECT UI

export function displayProject(project) {
    const container = document.createElement("div")
    container.classList.add("project-container")
    container.addEventListener('click', () => displayAllToDoItemsFromProject(project))

    setProjectName(project, container)
    setProjectTotalToDoItems(project, container)
    setEditAndDeleteProjectButtons(project, container)

    mainGridContainer().appendChild(container)
}

function setProjectName(project, container) {
    const name = document.createElement("p")
    name.classList.add("project-name")
    name.textContent = project.getProjectName()
    
    container.appendChild(name)
}

function setProjectTotalToDoItems(project, container) {
    const totalToDoItems = document.createElement("p")
    totalToDoItems.classList.add("project-total-items")
    totalToDoItems.textContent = project.getToDoItemsList().length
    
    container.appendChild(totalToDoItems)
}

function setEditAndDeleteProjectButtons(project, container) {
    const div = document.createElement("div")
    div.classList.add("edit-delete-buttons-container")

    setEditProjectButton(project, div)
    setDeleteProjectButton(project, div)

    container.appendChild(div)
}

function setEditProjectButton(project, container) {
    const editProjectButton = document.createElement("button")
    editProjectButton.classList.add("square-button", "button-dark", "edit-button")

    const icon = document.createElement("div")
    icon.classList.add("edit-icon-dark")
    editProjectButton.appendChild(icon)

    editProjectButton.addEventListener('click', (event) => {
        event.stopPropagation()
        clearForm(editProjectForm())
        showEditProjectFormWithValues(project)
        editProjectModal().showModal()
    })
    
    container.appendChild(editProjectButton)
}

function setDeleteProjectButton(project, container) {
    const deleteProjectButton = document.createElement("button")
    deleteProjectButton.classList.add("square-button", "button-dark", "delete-button")

    const icon = document.createElement("div")
    icon.classList.add("trash-icon-dark")
    deleteProjectButton.appendChild(icon)

    deleteProjectButton.addEventListener('click', (event) => {
        event.stopPropagation()
        projectsManager.deleteProject(project)
        displayAllProjects(projectsManager.getProjectsList())
    })
    
    container.appendChild(deleteProjectButton)
}

function displayAllToDoItemsFromProject(project) {
    currentOpenProject = project

    clearMainGridContainer()

    showBackButton()
    hideNewProjectButton()
    showNewToDoButton()
    
    changeMainTitle(project.getProjectName(), "primary")

    const toDoItemsList = project.getToDoItemsList()
    if (toDoItemsList.length <= 0) {
        displayMessage("There are no to do items")
    } else {
        for (const toDoItem of toDoItemsList) {
            displayToDoItem(toDoItem)
        }
    }
}

// TO DO UI

export function displayToDoItem(toDo) {
    const container = document.createElement("div")
    container.classList.add("to-do-container")

    setToDoTitle(toDo, container)
    setToDoDescription(toDo, container)
    setToDoDueDate(toDo, container)
    setEditAndDeleteToDoButtons(toDo, container)

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

function setEditAndDeleteToDoButtons(toDo, container) {
    const div = document.createElement("div")
    div.classList.add("edit-delete-buttons-container")

    setEditToDoButton(toDo, div)
    setDeleteToDoButton(toDo, div)

    container.appendChild(div)
}

function setEditToDoButton(toDo, container) {
    const editToDoButton = document.createElement("button")
    editToDoButton.classList.add("square-button", "button-primary", "edit-button")

    const icon = document.createElement("div")
    icon.classList.add("edit-icon-primary")
    editToDoButton.appendChild(icon)

    editToDoButton.addEventListener('click', (event) => {
        event.stopPropagation()
        clearForm(editToDoForm())
        showEditToDoFormWithValues(toDo)
        editToDoModal().showModal()
    })
    
    container.appendChild(editToDoButton)
}

function setDeleteToDoButton(toDo, container) {
    const deleteToDoButton = document.createElement("button")
    deleteToDoButton.classList.add("square-button", "button-primary", "delete-button")
    
    const icon = document.createElement("div")
    icon.classList.add("trash-icon-primary")
    deleteToDoButton.appendChild(icon)

    deleteToDoButton.addEventListener('click', (event) => {
        event.stopPropagation()
        currentOpenProject.deleteToDoItem(toDo)
        displayAllToDoItemsFromProject(currentOpenProject)
    })
    
    container.appendChild(deleteToDoButton)
}