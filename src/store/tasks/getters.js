
export function allTasks (state) {
  return state.tasks
}

export function orphanTasks (state) {
  return state.tasks.filter(task => !task.project)
}

export function taskById (state) {
  return id => state.tasks.find(task => task.id === id)
}

export function projectTasks (state) {
  return ({ id }) => state.tasks.filter(task => task.project === id)
}

export function activeTask (state) {
  return state.tasks.find(task => task.id === state.activeTaskId)
}
