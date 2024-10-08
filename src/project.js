export default function Project({projectName, toDoItems = []}) {
  let name = projectName
  const toDoItemsList = toDoItems

  const getProjectName = () => {
    return name
  }

  const updateProjectName = (newName) => {
    name = newName
  }

  const addToDoItem = (toDoItem) => {
    toDoItemsList.push(toDoItem)
  }

  const deleteToDoItem = (toDoItem) => {
    const deletedToDoItemIdx = toDoItemsList.indexOf(toDoItem)
    
    if (deletedToDoItemIdx === -1) {
      // toDoItem not found in toDoItemsList
      throw new Error(`${toDoItem.title} not found in project ${name}`)
    }

    toDoItemsList.splice(deletedToDoItemIdx, 1)
  }

  const getToDoItemsList = () => {
    return toDoItemsList
  }

  const state = () => ({name, todos: toDoItemsList.map(it => it.state())})
  
  return {
    getProjectName,
    updateProjectName,
    addToDoItem,
    deleteToDoItem,
    getToDoItemsList,
    state
  }
}