import ProjectsAPI from 'api/projects'
import ReportsAPI from 'api/reports'

export async function fetchProjects ({ commit }) {
  commit('setProjects', await ProjectsAPI.getAll())
}

export async function createProject ({ commit }, project) {
  const newProject = await ProjectsAPI.create(project)
  commit('addProject', newProject)
  return newProject
}

export async function updateProject ({ commit }, { id, update }) {
  const project = await ProjectsAPI.update(id, update)
  commit('updateProject', project)
  return project
}

export async function removeProject ({ commit }, query) {
  const project = await ProjectsAPI.remove(query)
  await ReportsAPI.removeOnProject(project.id)
  commit('removeProject', project)
}
