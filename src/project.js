export default class Project {
    constructor({name}) {
      this.name = name
      this.toDoItemsList = []
    }

    addToDoItem(toDoItem) {
      this.toDoItemsList.push(toDoItem)
    }

    deleteToDoItem(toDoItem) {
      const deletedItemIdx = this.toDoItemsList.indexOf(toDoItem)
      
      if (deletedItemIdx === -1) {
        // toDoItem not found in this.toDoItemsList
        throw new Error(`${toDoItem.title} not found in project ${this.name}`)
      }

      this.toDoItemsList.splice(deletedItemIdx, 1);
    }
}