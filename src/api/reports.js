import { uid } from 'quasar'
import { db } from './database'

import { toJSON, asDateKey } from './helpers'

export const createReport = async ({
  timestamp = Date.now(),
  progress,
  taskId,
  projectId
}) => db.reports
  .insert({
    id: uid(),
    progress,
    timestamp,
    task: taskId,
    project: projectId,
    datekey: asDateKey(timestamp)
  })
  .then(toJSON)

export const removeReportsOnTask = async taskId =>
  db.reports
    .find({ task: taskId })
    .remove()

export const removeReportsOnProject = async projectId =>
  db.reports
    .find({ project: projectId })
    .remove()

export const removeReportsOn = async query =>
  db.reports
    .find({ ...query })
    .remove()

export const findReportsOnDates = async ({
  from = new Date(),
  to = new Date()
}) =>
  (await db
    .reports
    .find({
      datekey: { $gte: asDateKey(from), $lte: asDateKey(to) }
    })
    .exec())
    .map(toJSON)

export const findReportsOnTask = async taskId =>
  (await db
    .reports
    .find({ task: taskId })
    .exec())
    .map(toJSON)

export const findReportsOnProject = async projectId =>
  (await db
    .reports
    .find({ project: projectId })
    .exec())
    .map(toJSON)

export const bindTaskProject = async (taskId, projectId) =>
  db.reports
    .find({ task: taskId })
    .update({
      $set: { project: projectId }
    })

export const unBindTaskProject = async taskId =>
  db.reports
    .find({ task: taskId })
    .update({
      $unset: { project: '' }
    })

export default {
  create: createReport,
  findTask: findReportsOnTask,
  findDates: findReportsOnDates,
  findProject: findReportsOnProject,
  removeOnTask: removeReportsOnTask,
  removeOnProject: removeReportsOnProject,
  removeOn: removeReportsOn,
  bindProject: bindTaskProject,
  unBindProject: unBindTaskProject
}
