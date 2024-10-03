export default function ProjectsManager({ projects = []}={}) {
    const projectsList = projects

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

    const state = () => projectsList.map(it => it.state())
    
    return {
      getProjectsList,
      addProject,
      deleteProject,
      state
    }
}