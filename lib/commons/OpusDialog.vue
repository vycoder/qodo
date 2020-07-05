<template>
  <q-dialog
    ref="dialog"
    v-on="$listeners"
    @hide="onDialogHide"
    :maximized="$q.platform.is.mobile">
    <q-layout
      container
      view="lHh Lpr lFf"
      :style="style"
      class="bg-white q-dialog-plugin">
      <q-header class="q-pl-md q-py-xs bg-white text-primary shadow-light admob-padding">
        <q-toolbar>
          <q-toolbar-title class="underline">
            {{title}}
          </q-toolbar-title>
          <q-btn
            @click="onCancelClick"
            icon="close"
            flat round dense
            v-close-popup />
        </q-toolbar>
        <div class="sleeve q-pb-sm"></div>
      </q-header>
      <q-footer
        v-if="$slots.actions"
        class="row justify-center q-pa-md bg-white">
        <slot name="actions" />
      </q-footer>

      <q-page-container>
        <q-page padding>
          <q-card flat>
            <slot></slot>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
import {
  QDialog,
  QLayout,
  QHeader,
  QFooter,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QPage,
  QPageContainer,
  QCard
} from 'quasar'

export default {
  name: 'OpusDialog',
  components: {
    QDialog,
    QLayout,
    QHeader,
    QFooter,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QPage,
    QPageContainer,
    QCard
  },
  props: {
    title: { type: String, default: '' }
  },
  computed: {
    style () {
      if (this.$q.platform.is.electron) {
        return { height: '75vh' }
      }
      return null
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
