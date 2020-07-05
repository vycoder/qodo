import { Platform } from 'quasar'
import RxDB from 'rxdb'
import ProjectSchema from './schema/project'
import TaskSchema from './schema/task'
import ReportSchema from './schema/report'

const dbName = process.env.DB_NAME || 'opus_db'

export const createDB = async () => {
  if (Platform.is.capacitor) {
    // Pre-req: Install sqlite cordova plugin first: https://github.com/nolanlawson/cordova-plugin-sqlite-2
    RxDB.plugin(require('pouchdb-adapter-cordova-sqlite'))
    return RxDB.create({ name: dbName, adapter: 'cordova-sqlite' })
  }
  RxDB.plugin(require('pouchdb-adapter-idb'))
  // RxDB.removeDatabase(dbName, 'idb')
  return RxDB.create({ name: dbName, adapter: 'idb' })
}

const initializeCollection = async (db, name, schema) => {
  return db.collection({ name, schema })
}

export let db = null
export const initializeDb = async () => {
  db = await createDB()
  await initializeCollection(db, 'projects', ProjectSchema)
  await initializeCollection(db, 'tasks', TaskSchema)
  await initializeCollection(db, 'reports', ReportSchema)
}

export default {
  db,
  initializeDb
}
