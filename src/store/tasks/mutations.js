import Vue from 'vue'

export function setTasks (state, tasks) {
  state.tasks = [...tasks]
}

export function addTask (state, task) {
  const found = state.tasks.findIndex(({ id }) => id === task.id)
  if (found >= 0) {
    Vue.set(state.tasks, found, {
      ...state.tasks[found], ...task
    })
    return
  }
  state.tasks.push(task)
}

const findTask = (list, { id }, callback = () => {}) => {
  const found = list.findIndex(task => task.id === id)
  if (found >= 0) {
    callback(found)
  }
}

export function removeTask (state, task) {
  findTask(state.tasks, task, index => (state.tasks.splice(index, 1)))
}

export function updateTask (state, update) {
  findTask(
    state.tasks,
    update,
    (index) => {
      Vue.set(state.tasks, index, {
        ...state.tasks[index], ...update
      })
    }
  )
}

export function setTaskProject (state, { taskId, projectId }) {
  findTask(
    state.tasks,
    { id: taskId },
    (index) => {
      Vue.set(state.tasks[index], 'project', projectId)
    }
  )
}

export function removeTaskProject (state, id) {
  findTask(state.tasks, { id }, (index) => Vue.set(state.tasks[index], 'project', null))
}

export function setActiveTask (state, { id }) {
  state.activeTaskId = id
}

export function clearActiveTask (state) {
  state.activeTaskId = ''
}
