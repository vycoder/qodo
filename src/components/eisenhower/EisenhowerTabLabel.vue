<template functional>
  <div class="row justify-center items-baseline">
    <div class="col">
      <div class="text-h5 text-capitalize">
        {{props.quadrants[props.value].label}}
        <q-btn
          @click="listeners.click"
          icon="info"
          size="10px"
          color="accent"
          round flat />
      </div>
      <div class="text-caption text-grey-8">{{props.quadrants[props.value].caption}}</div>
    </div>
    <div class="q-ml-auto col-auto">
      <div class="col relative-position">
        <div class="row q-col-gutter-xs">
          <div class="col-6">
            <div
              class="pill"
              :class="props.value === 'do' ?
                `bg-${props.quadrants.do.color} shadow-1` :
                `bg-${props.quadrants.do.color}-2`"
              >
            </div>
          </div>
          <div class="col-6">
            <div
              class="pill"
              :class="props.value === 'decide' ?
                `bg-${props.quadrants.decide.color} shadow-1` :
                `bg-${props.quadrants.decide.color}-2`"
              >
            </div>
          </div>
          <div class="col-6">
            <div
              class="pill"
              :class="props.value === 'delegate' ?
                `bg-${props.quadrants.delegate.color} shadow-1` :
                `bg-${props.quadrants.delegate.color}-2`"
              >
            </div>
          </div>
          <div class="col-6">
            <div
              class="pill"
              :class="props.value === 'delete' ?
                `bg-${props.quadrants.delete.color} shadow-1` :
                `bg-${props.quadrants.delete.color}-2`"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EisenhowerTabLabel',
  functional: true,
  props: {
    value: { type: String, default: 'do' },
    quadrants: { type: Object, required: true }
  }
}
</script>
<style lang="scss">
.pill {
  padding: 10px 4px;
  border-radius: .2rem;
  border-color: currentColor;
  cursor: pointer;
}
</style>
