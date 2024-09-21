export default class ToDoItem {
    constructor({title, description = "", dueDate, project}) {
      this.title = title
      this.description = description
      this.dueDate = dueDate
      this.project = project
      this.completed = false
    }
}