import ProjectsManager from "./projects-manager"
import Project from "./project"
import ToDoItem from "./to-do-item"

export function save(projectManager) {
    const json = JSON.stringify(projectManager.state())

    localStorage.setItem('globalState', json)
}

export function read() {
    const globalState = JSON.parse(
        localStorage.getItem('globalState') ?? '[]'
    )

    return ProjectsManager({
        projects: globalState.map(project => {

            return Project({ 
                projectName: project.name,
                toDoItems: project.todos.map(toDo => {

                    return ToDoItem({
                        itemTitle: toDo.title,
                        itemDescription: toDo.description,
                        itemDueDate: new Date(toDo.dueDate),
                        itemCompleted: toDo.completed
                    })
                })
            })
        })
    })
    
    
}