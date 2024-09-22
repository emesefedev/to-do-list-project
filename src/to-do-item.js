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

  const updateDescription = (newDescription) => {
    description = newDescription
  }

  const updateDueDate = (newDueDate) => {
    dueDate = newDueDate
  }

  const updateCompleted = (isCompleted) => {
    completed = isCompleted
  }
  
  return {
    getTitle,
    updateTitle,
    updateDescription,
    updateDueDate,
    updateCompleted
  }
}