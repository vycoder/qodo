<template functional>
  <q-slide-item
    class="rounded-borders"
    :left-color="props.leftColor"
    :right-color="props.rightColor"
    :class="{
      [props.contentClasses] : props.contentClasses,
      'shadow-light': !props.flat
    }"
    @action="_ => listeners.action ? listeners.action(_) : () => {}"
    @left="({ reset }) => $slots['swipe-left'] ? listeners.swipeLeft(props.value, reset) : () => {}"
    @right="({ reset }) => $slots['swipe-right'] ? listeners.swipeRight(props.value, reset) : () => {}">
    <template
      v-if="$slots['swipe-left']"
      v-slot:left>
      <slot name="swipe-left" />
    </template>
    <template
      v-if="$slots['swipe-right']"
      v-slot:right>
      <slot name="swipe-right" />
    </template>
    <q-item
      v-ripple:accent
      :clickable="props.clickable"
      class="rounded-borders"
      :class="props.innerItemClasses"
      @click.stop="listeners.click ? listeners.click(props.value) : (() => {})">
      <q-item-section>
        <q-item-label class="item-label" lines="1">
          <slot name="title" :task="props.value">
            <div class="text-h6 text-black ellipsis">
              {{ props.value.name }}
            </div>
          </slot>
        </q-item-label>
        <q-item-label caption lines="2">
          {{ props.value.description }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row items-center q-gutter-x-md">
          <div v-if="!props.noSide" class="text-h5 text-weight-light">
            <template v-if="props.value.progress >= 3600">
              {{props.value.progress | inHours}}<span class="text-caption">&nbsp;hrs</span>
            </template>
            <template v-else-if="props.value.progress >= 60">
              {{props.value.progress | inMinutes}}<span class="text-caption">&nbsp;min</span>
            </template>
            <template v-else-if="props.value.progress === 0">
              {{props.value.progress}}<span class="text-caption">&nbsp;hrs</span>
            </template>
            <template v-else>
              {{props.value.progress}}<span class="text-caption">&nbsp;sec</span>
            </template>
          </div>
          <template v-if="$slots.actions">
            <slot name="actions" />
          </template>
        </div>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    value: { type: Object, required: true },
    leftColor: { type: String, default: 'positive' },
    rightColor: { type: String, default: 'negative' },
    clickable: { type: Boolean, default: true },
    contentClasses: { type: String, default: '' },
    innerItemClasses: { type: String, default: '' },
    noSide: { type: Boolean, default: false },
    flat: { type: Boolean, default: false }
  }
}
</script>
<style lang="scss" scoped>
.item-label {
  max-width: 200px;
  @media(min-width: $breakpoint-sm) {
    max-width: 140px;
  }
}
</style>
