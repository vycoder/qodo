import Vue from 'vue'
import OpusImgCaption from './OpusImgCaption'

export default Vue.extend({
  functional: true,
  name: 'OpusImgCaptionGroup',
  props: {
    value: { type: String, required: true },
    options: { type: Object, required: true },
    contextClasses: { type: String }
  },
  render (h, { props }) {
    const { src, caption } = props.options[props.value]

    return h(OpusImgCaption, {
      props: {
        src,
        caption: caption || 'Nothing to see here...'
      },
      class: props.contextClasses
    })
  }
})
