import Vue from 'vue'

import { QBtn } from 'quasar'

export default Vue.extend({
  name: 'OpusBtnToggle',
  props: {
    value: { type: String, required: true },
    size: { type: String, default: 'sm' },
    options: { type: Array, required: true },
    nullable: { type: Boolean, default: false },
    color: { type: String, default: 'primary' }
  },
  methods: {
    select (option) {
      if (this.nullable && option.value === this.value) {
        this.$emit('input', '')
        return
      }
      this.$emit('input', option.value)
    },
    isSelected (option) {
      return option.value === this.value
    }
  },
  render (h) {
    const btns = this.options.map(option =>
      h(QBtn, {
        props: {
          noCaps: true,
          rounded: true,
          size: this.size,
          color: this.color,
          label: option.label,
          outline: !this.isSelected(option),
          unelevated: this.isSelected(option)
        },
        on: {
          click: () => this.select(option)
        }
      })
    )
    return h(
      'section',
      { class: 'row' + this.class || 'q-gutter-x-xs' },
      btns
    )
  }
})
