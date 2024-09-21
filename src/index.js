import "./style.css"
import ToDoItem from "./to-do-item.js"

console.log("Hello emesefedev")

const toDo = new ToDoItem({
    title: "New ToDo", 
    dueDate: new Date(2024, 11, 1), 
    project: "default"})

console.log(toDo)