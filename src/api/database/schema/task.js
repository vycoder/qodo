export default {
  version: 0,
  keyCompression: true,
  name: 'task',
  title: 'Tasks',
  type: 'object',
  properties: {
    id: { type: 'string', primary: true },
    name: { type: 'string' },
    description: { type: 'string' },
    urgent: { type: 'boolean', default: false },
    important: { type: 'boolean', default: false },
    completed: { type: 'boolean', default: false },
    progress: { type: 'number' },
    project: {
      type: 'string',
      ref: 'projects'
    },
    created: { type: 'number' },
    updated: { type: 'number' }
  }
}
