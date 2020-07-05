<template>
  <q-btn
    @click.stop.prevent="$emit('click')"
    :flat="flat"
    :round="round"
    :dense="dense"
    :icon="icon"
    :size="size">
    <q-menu
      transition-show="jump-down"
      transition-hide="jump-up"
      content-class="z-max"
      auto-close>
      <q-list
        :style="`max-width: ${menuWidth}px`"
        :dense="denseMenuList">
        <template v-for="(action, i) in actions">
          <q-item
            :key="i"
            v-if="action.label"
            clickable
            @click.stop="() => action.handler(target)"
            v-close-popup>
            <q-item-section>
              <q-item-label>
                {{ action.label }}
              </q-item-label>
            </q-item-section>
            <q-item-section
              side top
              v-if="action.icon"
              avatar>
              <q-icon v-bind="action.icon" />
            </q-item-section>
          </q-item>
          <q-separator v-else :key="i"/>
        </template>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
import {
  QBtn,
  QMenu,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QSeparator
} from 'quasar'

export default {
  name: 'OpusMoreActionsMenuBtn',
  components: {
    QBtn,
    QMenu,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QSeparator
  },
  props: {
    target: { type: Object, required: true },
    icon: { type: String, default: 'more_horiz' },
    flat: { type: Boolean, default: true },
    round: { type: Boolean, default: true },
    dense: { type: Boolean, default: true },
    size: { type: String, default: 'sm' },
    denseMenuList: { type: Boolean, default: false },
    actions: { type: Array, default: () => ([]) },
    menuWidth: { type: Number, default: 150 }
  }
}
</script>
