import "./style.css"
import ToDoItem from "./to-do-item.js"
import Project from "./project.js"

const defaultProject = Project({projectName: "Default Project"})

const toDo = ToDoItem({
    itemTitle: "New ToDo", 
    itemDueDate: new Date(2024, 11, 1)
})

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

console.log(toDo3.getCompleted())
toDo3.updateCompleted(true)
console.log(toDo3.getCompleted())

console.log(defaultProject.getToDoItemsList())