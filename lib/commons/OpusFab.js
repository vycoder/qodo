import Vue from 'vue'

import { QBtn } from 'quasar'

export default Vue.extend({
  name: 'OpusFab',
  props: {
    icon: { type: String, default: 'add' },
    color: { type: String, default: 'accent' },
    show: { type: Boolean, default: true },
    appear: { type: Boolean, default: false },
    size: { type: String }
  },
  render (h) {
    const children = []
    if (this.show) {
      const props = {
        icon: this.icon,
        color: this.color,
        unelevated: true
      }
      if (this.size) {
        props.round = true
        props.size = this.size
      } else {
        props.fab = true
      }
      children.push(h(QBtn, {
        props,
        class: 'shadow-10',
        on: {
          click: () => this.$emit('click')
        }
      }))
    }
    return h('transition', {
      props: {
        appear: this.appear,
        enterActiveClass: 'animated bounceIn',
        leaveActiveClass: 'animated bounceOut'
      }
    }, children)
  }

})
