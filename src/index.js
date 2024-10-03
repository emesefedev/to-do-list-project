import { read } from "./local-storage.js"
import "./style.css"
import { displayAllProjects } from "./ui.js"

export let projectsManager = null

window.addEventListener("load", () => {
    
    projectsManager = read()

    displayAllProjects(projectsManager.getProjectsList())
})

