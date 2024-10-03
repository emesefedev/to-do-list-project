export default function ProjectsManager() {
    const projectsList = []

    const getProjectsList = () => {
      return projectsList
    }

    const addProject = (project) => {
        projectsList.push(project)
    }

    const deleteProject = (project) => {
        const deletedProjectIdx = projectsList.indexOf(project)
      
      if (deletedProjectIdx === -1) {
        // project not found in projectsList
        throw new Error(`${project.name} not found`)
      }

      projectsList.splice(deletedProjectIdx, 1);
    }
    
    return {
      getProjectsList,
      addProject,
      deleteProject
    }
}