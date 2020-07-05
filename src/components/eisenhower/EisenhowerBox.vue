<template>
  <div
    @dragenter="$emit('dragenter')"
    @dragleave="$emit('dragleave')"
    @dragover.prevent="$emit('dragover')"
    @drop.prevent="$emit('drop')"
    :class="`text-${color}`"
    class="bg-white rounded-borders shadow-light fit">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      class="full-height bg-grey-1"
      :class="{
        [corner]: true,
        'bg-grey-1': !active,
        'active': active
      }">
      <div
        style="position: sticky; top: 0;"
        :class="{ [corner] : corner.startsWith('top') }"
        class="title sleeve z-top shadow-light q-pa-md bg-white">
        <slot name="title">
          <q-item dense>
            <q-item-section side class="text-h6 text-weight-light" :class="`text-${color}`">
              {{size}}
            </q-item-section>
            <q-item-section>
              <q-item-label class="row items-center">
                <div style="font-size: 1.1rem"
                  class="text-bold text-subtitle1">
                  {{title}}
                </div>
                <q-btn
                  round flat
                  color="info"
                  class="q-ml-xs"
                  size="sm" icon="info">
                  <q-popup-proxy>
                    <q-card
                      class="shadow-light"
                      :class="`text-${color}`"
                      style="border-left: 5px currentColor solid; width: 32vw;">
                      <q-card-section v-html="description" class="text-caption text-grey-8" />
                    </q-card>
                  </q-popup-proxy>
                </q-btn>
              </q-item-label>
              <q-item-label caption style="margin-top: 0">
                {{subtitle}}
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-avatar :icon="icon" :color="color" text-color="white" />
            </q-item-section>
          </q-item>
        </slot>
      </div>
      <div :class="corner">
        <slot />
      </div>
    </q-scroll-area>
  </div>
</template>
<script>
export default {
  props: {
    corner: { type: String, required: true },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    active: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    color: { type: String, default: 'primary' },
    size: { type: Number, default: 0 }
  },
  data () {
    return {
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: this.color,
        width: '5px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: 'grey',
        width: '9px',
        opacity: 0.2
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.top-left {
  border-top-left-radius: $generic-border-radius;
}
.top-right {
  border-top-right-radius: $generic-border-radius;
}
.bottom-left {
  border-bottom-left-radius: $generic-border-radius;
}
.bottom-right {
  border-bottom-right-radius: $generic-border-radius;
}
.active {
  outline-color: currentColor;
  outline-width: 2px;
  outline-style: dashed;
  background-color: $grey-3
}
</style>
