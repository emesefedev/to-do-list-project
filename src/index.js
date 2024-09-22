import "./style.css"
import ToDoItem from "./to-do-item.js"
import Project from "./project.js"

console.log("Hello emesefedev")

const defaultProject = new Project({name: "Default Project"})

const toDo = new ToDoItem({
    title: "New ToDo", 
    dueDate: new Date(2024, 11, 1)
})

const toDo2 = new ToDoItem({
    title: "New ToDo 2", 
    dueDate: new Date(2024, 11, 2)
})

const toDo3 = new ToDoItem({
    title: "New ToDo 3", 
    dueDate: new Date(2024, 11, 3)
})

defaultProject.addToDoItem(toDo)
defaultProject.addToDoItem(toDo2)
defaultProject.addToDoItem(toDo3)

console.log(defaultProject)

defaultProject.deleteToDoItem(toDo3)

console.log(defaultProject)