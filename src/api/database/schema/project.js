export default {
  version: 0,
  keyCompression: true,
  name: 'project',
  title: 'Projects',
  type: 'object',
  properties: {
    id: { type: 'string', primary: true },
    name: { type: 'string' },
    description: { type: 'string' },
    created: { type: 'number' },
    updated: { type: 'number' }
  }
}
