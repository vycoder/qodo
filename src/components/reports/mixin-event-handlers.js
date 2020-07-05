import { RootEvents } from 'lib/constants'
import { PomodoroEvents } from 'lib/pomodoro'

export default {
  mounted () {
    this.$o.pomodoro.registerOn(PomodoroEvents.Update, this.updateRecords)
    this.$root.$on(RootEvents.TaskDeleted, this.updateRecords)
    this.$root.$on(RootEvents.ProjectDeleted, this.updateRecords)
  },
  methods: {
    updateRecords () {
      // This should be overridden
    }
  },
  beforeDestroy () {
    this.$o.pomodoro.unRegister(PomodoroEvents.Update, this.updateRecords)
    this.$root.$on(RootEvents.TaskDeleted, this.updateRecords)
    this.$root.$on(RootEvents.ProjectDeleted, this.updateRecords)
  }
}
