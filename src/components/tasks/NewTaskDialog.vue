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
      <q-card-section class="column q-gutter-y-md">
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
        <q-select
          v-if="isProjectSelectionEnabled"
          v-model="projectSelection"
          :options="allProjects"
          label="Project Name"
          option-value="id"
          option-label="name"
          emit-value map-options
          clearable clear-icon="clear"
          hint="Add to existing project (Optional)"
          :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"/>
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

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NewTaskDialog',
  mixins: [UseOpusDialog],
  components: { OpusDialog },
  props: {
    noProjectInput: { type: Boolean, default: false }
  },
  data () {
    return {
      projectSelection: '',
      model: {
        name: '',
        description: '',
        urgent: false,
        important: false
      }
    }
  },
  computed: {
    ...mapGetters('projects', ['allProjects']),
    isProjectSelectionEnabled () {
      return !this.noProjectInput && this.allProjects.length
    }
  },
  methods: {
    ...mapActions('tasks', ['createTask']),
    async save () {
      const payload = this.isProjectSelectionEnabled && this.projectSelection
        ? { ...this.model, project: this.projectSelection }
        : { ...this.model }
      const task = await this.createTask(payload)
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
      this.projectSelection = null
    }
  }
}
</script>
