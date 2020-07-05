import Utils from 'lib/utils'

import UseTasksDialogs from './mixin-tasks-dialogs'

import { mapGetters } from 'vuex'

export default {
  mixins: [UseTasksDialogs],
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
  },
  methods: {
    async startTask (task, reset = () => {}) {
      if (this.activeTask) {
        await this.$o.pomodoro.updateActiveTask()
      }
      this.$store.commit('tasks/setActiveTask', task)
      this.$store.commit('pomodoro/clear')
      this.$o.pomodoro.start()
      reset()
      await this.$nextTick()
      Utils.scrollTo('active-task')
    },
    async clearActiveTask (reset = () => {}) {
      await this.$o.pomodoro.updateActiveTask()
      this.$store.commit('tasks/clearActiveTask')
      this.$store.commit('pomodoro/clear')
      reset()
    },
    async markComplete (task, reset = () => {}) {
      reset()
      if (this.activeTask && this.activeTask.id === task.id) {
        await this.clearActiveTask()
      }
      return this.$store.dispatch('tasks/updateTask', {
        id: task.id,
        update: { completed: true }
      })
    },
    markUnComplete (task) {
      return this.$store.dispatch('tasks/updateTask', {
        id: task.id,
        update: { completed: false }
      })
    }
  }
}
