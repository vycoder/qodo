import { mapGetters } from 'vuex'
import { padZero, inMinutes } from 'lib/utils'

export default {
  computed: {
    ...mapGetters('pomodoro', [
      'isRunning',
      'currentSprintCount',
      'currentSprintMode',
      'isBreakMode',
      'sprintDuration',
      'elapsedSeconds'
    ]),
    delta () {
      return this.sprintDuration - this.elapsedSeconds
    },
    ss () {
      return padZero(this.delta % 60, 2)
    },
    mm () {
      return inMinutes(this.delta, 2)
    }
  },
  methods: {
    start () {
      this.$o.pomodoro.start()
      this.$emit('start')
    },
    reset () {
      if (this.elapsedSeconds > 0) {
        this.$o.pomodoro.reset()
        this.$emit('reset')
      }
    },
    skip () {
      this.$o.pomodoro.skip()
      this.$emit('skip')
    }
  }
}
