<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide">
    <q-card style="width: 70vw; height: 40vh">
      <div class="column fit text-center text-caption">
        <div :class="`col-6 relative-position bg-${quadrants.do.color}`">
          <div @click="select('do')" v-ripple class="fit cursor-pointer">
            <div class="absolute-center">
              <q-icon :name="quadrants.do.icon" color="white" size="lg"/>
            </div>
          </div>
        </div>
        <div @click="select('delegate')" :class="`col-6 relative-position bg-${quadrants.delegate.color}`">
          <div v-ripple class="fit cursor-pointer">
            <div class="absolute-center">
              <q-icon :name="quadrants.delegate.icon" color="white" size="lg"/>
            </div>
          </div>
        </div>
        <div @click="select('decide')" :class="`col-6 relative-position bg-${quadrants.decide.color}`">
          <div v-ripple class="fit cursor-pointer">
            <div class="absolute-center">
              <q-icon :name="quadrants.decide.icon" color="white" size="lg"/>
            </div>
          </div>
        </div>
        <div @click="select('delete')" :class="`col-6 relative-position bg-${quadrants.delete.color}`">
          <div v-ripple class="fit cursor-pointer">
            <div class="absolute-center">
              <q-icon :name="quadrants.delete.icon" color="white" size="lg"/>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script>
import { QDialog, QCard } from 'quasar'

export default {
  name: 'EisenhowerTabChooserDialog',
  components: {
    QDialog, QCard
  },
  props: {
    quadrants: { type: Object, require: true }
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
    select (tab) {
      this.$emit('ok', tab)
      this.hide()
    }
  }
}
</script>
