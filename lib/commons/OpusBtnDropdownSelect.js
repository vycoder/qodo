import Vue from 'vue'

import {
  QBtnDropdown,
  QList,
  QItem,
  ClosePopup,
  QItemSection,
  QItemLabel
} from 'quasar'

export default Vue.extend({
  name: 'OpusBtnDropdownSelect',
  props: {
    value: { type: String, required: true },
    size: { type: String, default: 'sm' },
    options: { type: Array, required: true },
    color: { type: String, default: 'accent' }
  },
  render (h) {
    const children = this.options.map(option =>
      h(QItem, {
        props: {
          clickable: true
        },
        directives: [ClosePopup],
        on: {
          click: () => this.$emit('input', option.value)
        }
      }, [h(QItemSection, [h(QItemLabel, [option.label])])])
    )
    return h(QBtnDropdown, {
      props: {
        label: this.options.find(o => o.value === this.value).label,
        color: this.color,
        size: this.size,
        rounded: true,
        noCaps: true,
        unelevated: true
      }
    }, [h(QList, children)])
  }
})
