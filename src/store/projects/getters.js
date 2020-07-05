
export function allProjects (state) {
  return state.projects
}

export function projectById (state) {
  return id => state.projects.find(project => project.id === id)
}
