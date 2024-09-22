export default function ToDoItem({itemTitle, itemDescription = "", itemDueDate}) {
  let title = itemTitle
  let description = itemDescription
  let dueDate = itemDueDate
  let completed = false

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
  
  return {
    getTitle,
    updateTitle,
    getDescription,
    updateDescription,
    getDueDate,
    updateDueDate,
    getCompleted,
    updateCompleted
  }
}