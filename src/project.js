export default function Project(projectName) {
  let name = projectName
  const toDoItemsList = []

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
  
  return {
    addToDoItem,
    deleteToDoItem,
    getToDoItemsList
  }
}