import { RootEvents } from 'lib/constants'

import TaskDetailsDialog from 'components/tasks/TaskDetailsDialog'
import NewTaskDialog from 'components/tasks/NewTaskDialog'
import EditTaskDialog from 'components/tasks/EditTaskDialog'

export default {
  data () {
    return {
      hasOpenDialog: false
    }
  },
  methods: {
    showTaskDetailsDialog (task) {
      this.hasOpenDialog = true
      this.$q.dialog({
        component: TaskDetailsDialog,
        parent: this,
        task
      }).onDismiss(() => (this.hasOpenDialog = false))
    },
    showNewTaskDialog () {
      this.hasOpenDialog = true
      this.$q.dialog({
        component: NewTaskDialog,
        parent: this
      }).onDismiss(() => (this.hasOpenDialog = false))
    },
    showEditTaskDialog (task) {
      this.hasOpenDialog = true
      this.$q.dialog({
        component: EditTaskDialog,
        parent: this,
        task
      }).onDismiss(() => (this.hasOpenDialog = false))
    },
    deleteTask (task) {
      this.$o
        .dialog
        .confirmDeleteTask(task)
        .onOk(async () => {
          await this.$store.dispatch('tasks/removeTask', task)
          this.$root.$emit(RootEvents.TaskDeleted, { ...task })
        })
    }
  }
}
