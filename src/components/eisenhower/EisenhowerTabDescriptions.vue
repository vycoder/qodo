<template functional>
  <q-slide-transition>
    <q-card
      v-if="props.value"
      @click="listeners.input(!props.value)"
      class="shadow-light q-mt-md"
      :class="`text-${props.color}`"
      style="border-left: 5px currentColor solid">
      <q-card-section class="text-caption text-grey-8">
        <slot />
      </q-card-section>
    </q-card>
  </q-slide-transition>
</template>
<script>

export default {
  name: 'EisenhowerTabDescriptions',
  functional: 'true',
  props: {
    value: { type: Boolean, default: false },
    color: { type: String, required: true }
  }
}
</script>
