import { uid } from 'quasar'
import { db } from './database'

import { toJSON } from './helpers'

export const getAllProjects = async () => (await db.projects.find().exec()).map(toJSON)

export const createProject = async ({
  name,
  description,
  timestamp = Date.now()
}) => db.projects
  .insert({
    id: uid(),
    name,
    description,
    created: timestamp,
    updated: timestamp
  }).then(toJSON)

export const updateProject = async (projectId, update) =>
  db.projects
    .findOne({ id: projectId })
    .update({ $set: { ...update, updated: Date.now() } })
    .then(toJSON)

export const removeProject = async projectQuery =>
  db.projects
    .findOne(projectQuery)
    .remove()

export default {
  create: createProject,
  getAll: getAllProjects,
  update: updateProject,
  remove: removeProject
}
