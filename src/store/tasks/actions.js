import TasksAPI from 'api/tasks'
import ReportsAPI from 'api/reports'

export async function fetchTasks ({ commit }) {
  commit('setTasks', await TasksAPI.getAll())
}

export async function createTask ({ commit }, task) {
  const newTask = await TasksAPI.create(task)
  commit('addTask', newTask)
  return newTask
}

export async function updateTask ({ commit }, { id, update }) {
  const task = await TasksAPI.update(id, update)
  commit('updateTask', task)
  return task
}

export async function removeTask ({ commit }, query) {
  const task = await TasksAPI.remove(query)
  await ReportsAPI.removeOnTask(task.id)
  commit('removeTask', task)
}

export async function updateActiveTaskProgress ({ getters, dispatch }, progress) {
  const { activeTask } = getters
  if (!activeTask) {
    return Promise.resolve()
  }
  return Promise.all([
    dispatch('updateTask', {
      id: activeTask.id,
      update: {
        progress: activeTask.progress + progress
      }
    }),
    ReportsAPI.create({
      progress,
      taskId: activeTask.id,
      projectId: activeTask.project
    })
  ])
}

export async function setTaskProject ({ commit }, { taskId, projectId }) {
  await TasksAPI.setProject({ taskId, projectId })
  await Promise.all([
    TasksAPI.setProject({ taskId, projectId }),
    ReportsAPI.bindProject(taskId, projectId)
  ])
  commit('setTaskProject', { taskId, projectId })
}

export async function removeTaskProject ({ commit }, id) {
  await Promise.all([
    TasksAPI.removeProject(id),
    ReportsAPI.unBindProject(id)
  ])
  commit('removeTaskProject', id)
}
