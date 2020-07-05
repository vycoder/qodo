
import Vue from 'vue'

export function setProjects (state, projects) {
  state.projects = [...projects]
}

export function addProject (state, project) {
  const found = state.projects.findIndex(({ id }) => id === project.id)
  if (found >= 0) {
    Vue.set(state.projects, found, {
      ...state.projects[found],
      ...project
    })
    return
  }
  state.projects.push(project)
}

const findProject = (list, { id }, callback = () => {}) => {
  const found = list.findIndex(task => task.id === id)
  if (found >= 0) {
    callback(found)
    return true
  }
  return false
}

export function updateProject (state, update) {
  findProject(
    state.projects,
    update,
    (index) => {
      Vue.set(state.projects, index, {
        ...state.projects[index], ...update
      })
    }
  )
}

export function removeProject (state, project) {
  findProject(state.projects, project, index => state.projects.splice(index, 1))
}
