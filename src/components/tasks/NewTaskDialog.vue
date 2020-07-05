<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    title="New Task">
    <template v-slot:actions>
      <q-btn
        @click="save"
        :disable="!model.name"
        icon="add"
        label="Add Task"
        color="accent"
        rounded no-caps
      />
    </template>
    <template>
      <q-card-section class="column q-gutter-y-lg">
        <q-input
          v-model.trim="model.name"
          label="Task Name"
          hide-bottom-space
          maxlength="30"
          counter
        />
        <q-input
          v-model.trim="model.description"
          label="Task Description"
          type="textarea"
          rows="4"
          maxlength="200"
          bottom-slots
          hint="(Optional)"
          counter
          hide-bottom-space
        />
        <div class="column q-pt-md">
          <div class="q-field__label q-mb-sm">Task Priority</div>
          <div class="column">
            <q-checkbox v-model="model.urgent" label="Urgent" />
            <q-checkbox v-model="model.important" label="Important" />
          </div>
        </div>
      </q-card-section>
    </template>
  </opus-dialog>
</template>
<script>
import UseOpusDialog from 'lib/commons/opus-dialog-functions'
import OpusDialog from 'lib/commons/OpusDialog'

import { mapActions } from 'vuex'

export default {
  name: 'NewTaskDialog',
  mixins: [UseOpusDialog],
  components: { OpusDialog },
  data () {
    return {
      model: {
        name: '',
        description: '',
        urgent: false,
        important: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['createTask']),
    async save () {
      const task = await this.createTask(this.model)
      this.$emit('ok', task)
      this.hide()
      this.clear()
    },
    clear () {
      this.model = {
        name: '',
        description: '',
        urgent: false,
        important: false
      }
    }
  }
}
</script>
