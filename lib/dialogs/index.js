import { Dialog } from 'quasar'

export default {
  confirmDeleteTask (task) {
    return Dialog.create({
      title: 'Delete Task',
      message: `Remove task <strong><code>${task.name}</code></strong> forever?<br/>This action cannot be undone.`,
      color: 'negative',
      persistent: true,
      cancel: true,
      html: true
    })
  },
  confirmDeleteProject (project) {
    return Dialog.create({
      title: 'Delete Project',
      message: `
        Remove project <strong><code>${project.name}</code></strong> 
        and <strong>all tasks (${project.tasks.length})</strong> along with it?<br/>
        This action cannot be undone
      `,
      color: 'negative',
      persistent: true,
      cancel: true,
      html: true
    })
  }
}
