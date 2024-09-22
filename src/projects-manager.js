function ProjectsManager() {
    const projectsList = []

    const addProject = (project) => {
        this.projectsList.push(project)
    }

    const removeProject = (project) => {
        const deletedProjectIdx = this.projectsList.indexOf(project)
      
      if (deletedProjectIdx === -1) {
        // project not found in this.projectsList
        throw new Error(`${project.name} not found`)
      }

      this.projectsList.splice(deletedProjectIdx, 1);
    }
    
    return {
        addProject,
        removeProject
    }
}