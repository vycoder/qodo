import { uid } from 'quasar'
import { db } from './database'

import { toJSON } from './helpers'

export const createTask = async ({
  name,
  description,
  project,
  urgent = false,
  important = false,
  timestamp = Date.now()
}) => db.tasks
  .insert({
    id: uid(),
    name,
    description,
    project,
    urgent,
    important,
    progress: 0,
    completed: false,
    created: timestamp,
    updated: timestamp
  }).then(toJSON)

export const getAllTasks = async () => (await db.tasks.find().exec()).map(toJSON)

export const getAllOrphanTasks = async () =>
  (await db.tasks
    .find()
    .where('project')
    .exists(false)
    .exec())
    .map(toJSON)

export const updateTask = async (taskId, update) =>
  db.tasks
    .findOne({ id: taskId })
    .update({ $set: { ...update, updated: Date.now() } })
    .then(toJSON)

export const removeTask = async taskQuery =>
  db.tasks
    .findOne(taskQuery)
    .remove()

export const setTaskProject = async ({ taskId, projectId }) =>
  db.tasks
    .findOne({ id: taskId })
    .update({ $set: { project: projectId, updated: Date.now() } })
    .then(toJSON)

export const removeTaskProject = async taskId =>
  db.tasks
    .findOne({ id: taskId })
    .update({
      $set: { updated: Date.now() },
      $unset: { project: '' }
    })
    .then(toJSON)

export default {
  create: createTask,
  getAll: getAllTasks,
  getOrphans: getAllOrphanTasks,
  update: updateTask,
  remove: removeTask,
  setProject: setTaskProject,
  removeProject: removeTaskProject
}
