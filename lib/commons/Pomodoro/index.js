import Vue from 'vue'
import { Platform } from 'quasar'

const component = Platform.is.electron ? require('./PomodoroDesktop') : require('./PomodoroMobile')

export default Vue.extend({
  functional: true,
  render (h, context) {
    return h(
      component.default,
      context.data,
      context.children)
  }
})
