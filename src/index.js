import "./style.css"
import ToDoItem from "./to-do-item.js"
import Project from "./project.js"

console.log("Hello emesefedev")

const defaultProject = new Project({name: "Default Project"})

const toDo = new ToDoItem({
    title: "New ToDo", 
    dueDate: new Date(2024, 11, 1), 
    project: defaultProject})

console.log(toDo)