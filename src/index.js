import "./style.css"
import ToDoItem from "./to-do-item.js"
import Project from "./project.js"

const titleText = () => document.getElementById("titleText")
const descriptionText = () => document.getElementById("descriptionText")
const dueDateText = () => document.getElementById("dueDateText")
const completedCheckbox = () => document.getElementById("completedCheckbox")

window.addEventListener("load", () => {
    const defaultProject = Project({projectName: "Default Project"})

    const toDo = ToDoItem({
        itemTitle: "New ToDo", 
        itemDescription: "The first ToDo",
        itemDueDate: new Date(2024, 11, 1)
    })

    toDo.displayInformation({titleText, descriptionText, dueDateText, completedCheckbox})

    const toDo2 = ToDoItem({
        itemTitle: "New ToDo 2", 
        itemDueDate: new Date(2024, 11, 2)
    })

    const toDo3 = ToDoItem({
        itemTitle: "New ToDo 3", 
        itemDueDate: new Date(2024, 11, 3)
    })

    defaultProject.addToDoItem(toDo)
    defaultProject.addToDoItem(toDo2)
    defaultProject.addToDoItem(toDo3)

    console.log(defaultProject.getToDoItemsList())

    defaultProject.deleteToDoItem(toDo2)

    // TODO: Mover de un proyecto a otro

    console.log(defaultProject.getToDoItemsList())
})

