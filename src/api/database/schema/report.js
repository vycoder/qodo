export default {
  version: 0,
  keyCompression: true,
  name: 'report',
  title: 'Reports',
  type: 'object',
  properties: {
    id: { type: 'string', primary: true },
    datekey: { type: 'number', index: true },
    progress: { type: 'number', default: 0 },
    timestamp: { type: 'number' },
    task: {
      type: 'string',
      ref: 'tasks',
      index: true
    },
    project: {
      type: 'string',
      ref: 'projects',
      index: true
    }
  }
}
