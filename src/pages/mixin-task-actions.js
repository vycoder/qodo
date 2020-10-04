import Utils from 'lib/utils'
import { RootEvents } from 'lib/constants'

import { mapGetters } from 'vuex'

export default {
  computed: { ...mapGetters('tasks', ['activeTask']) },
  methods: {
    async startTask (task, reset = () => {}) {
      if (this.activeTask) {
        await this.$o.pomodoro.updateActiveTask()
        this.$root.$emit(RootEvents.TaskProgressUpdated, { ...this.activeTask })
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
      this.$root.$emit(RootEvents.TaskProgressUpdated, { ...this.activeTask })
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
