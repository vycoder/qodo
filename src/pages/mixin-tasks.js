import UseTasksDialogs from './mixin-tasks-dialogs'
import UseTaskActions from './mixin-task-actions'

import { mapGetters } from 'vuex'

export default {
  mixins: [
    UseTasksDialogs,
    UseTaskActions
  ],
  data () {
    return {
      selectedFilter: '',
      filters: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'To do', value: 'todo' },
        { label: 'Completed', value: 'completed' }
      ],
      hasOpenDialog: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['activeTask']),
    tasks () {
      let tasks = this.$store
        .getters['tasks/allTasks']
        .slice()
        .sort((a, b) => b.updated - a.updated)

      if (this.activeTask) {
        tasks = tasks.filter(task => task.id !== this.activeTask.id)
      }

      if (this.selectedFilter === 'completed') {
        return tasks.filter(task => task.completed)
      } else if (this.selectedFilter === 'ongoing') {
        return tasks
          .filter(task => !task.completed)
          .filter(task => task.progress > 0)
      } else if (this.selectedFilter === 'todo') {
        return tasks.filter(task => task.progress === 0)
      } else {
        return tasks.filter(task => !task.completed)
      }
    },
    actions () {
      const generics = [
        {},
        {
          label: 'Edit',
          icon: { name: 'edit', color: 'blue' },
          handler: this.showEditTaskDialog
        },
        {},
        {
          label: 'Delete',
          icon: { name: 'delete', color: 'negative' },
          handler: this.deleteTask
        }
      ]
      const primary = this.selectedFilter === 'completed'
        ? [{
          label: 'Ongoing',
          icon: { name: 'restore', color: 'secondary' },
          handler: this.markUnComplete
        }] : [{
          label: 'Start',
          icon: { name: 'play_arrow', color: 'primary' },
          handler: this.startTask
        },
        {
          label: 'Mark as Complete',
          icon: { name: 'done', color: 'positive' },
          handler: this.markComplete
        }]

      return [
        ...primary,
        ...generics
      ]
    }
  }
}
