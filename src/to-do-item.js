export default class ToDoItem {
    constructor({title, description = "", dueDate}) {
      this.title = title
      this.description = description
      this.dueDate = dueDate

      this.completed = false
    }

    updateTitle(newTitle) {
      this.title = newTitle
    }

    updateDescription(newDescription) {
      this.description = newDescription
    }

    updateDueDate(newDueDate) {
      this.dueDate = newDueDate
    }

    updateCompleted(isCompleted) {
      this.completed = isCompleted
    }
}