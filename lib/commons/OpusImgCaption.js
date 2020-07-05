import Vue from 'vue'
import { QImg } from 'quasar'

export default Vue.extend({
  name: 'OpusImgCaption',
  props: {
    src: { type: String, required: true },
    width: { type: String, default: '250px' },
    contentClasses: { type: String, default: 'q-pa-md fixed-center text-center' },
    contentStyle: { type: String, default: '' },
    caption: { type: String }
  },
  render (h) {
    const children = []
    children.push(h(QImg, {
      props: {
        src: require(`assets/${this.src}`),
        width: this.width,
        basic: true
      }
    }))
    if (this.$slots.default) {
      children.push(this.$slots.default)
    } else {
      children.push(h('div',
        { class: 'text-caption text-grey q-mt-md text-italic' },
        this.caption))
    }
    return h('section', {
      class: this.contentClasses,
      style: 'z-index: -1;' + this.contentStyle
    }, children)
  }
})
