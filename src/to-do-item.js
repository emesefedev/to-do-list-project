export default function ToDoItem({itemTitle, itemDescription, itemDueDate}) {
  let title = itemTitle
  let description = itemDescription
  let dueDate = itemDueDate
  let completed = false
  const id = self.crypto.randomUUID()

  const getTitle = () => {
    return title
  }

  const updateTitle = (newTitle) => {
    title = newTitle
  }

  const getDescription = () => {
    return description
  }

  const updateDescription = (newDescription) => {
    description = newDescription
  }

  const getDueDate = () => {
    return dueDate
  }

  const updateDueDate = (newDueDate) => {
    dueDate = newDueDate
  }

  const getCompleted = () => {
    return completed
  }

  const updateCompleted = (isCompleted) => {
    completed = isCompleted
  }

  const getId = () => {
    return id
  }
  
  return {
    getTitle,
    updateTitle,
    getDescription,
    updateDescription,
    getDueDate,
    updateDueDate,
    getCompleted,
    updateCompleted,
    getId
  }
}