<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    title="Edit Task">
    <template v-slot:actions>
      <q-btn
        @click="save"
        :disable="!hasChanged || !model.name"
        icon="done"
        label="Save"
        color="accent"
        rounded no-caps
      />
    </template>
    <template>
      <q-card-section class="column q-gutter-y-md">
        <q-input
          v-model.trim="model.name"
          :placeholder="task.name"
          label="Task Name"
          hide-bottom-space
        />
        <q-input
          v-model.trim="model.description"
          label="Task Description"
          :placeholder="task.description"
          type="textarea"
          rows="4"
          maxlength="200"
          bottom-slots
          hint="(Optional)"
          counter
          hide-bottom-space
        />
        <q-select
          v-if="allProjects.length"
          v-model="model.project"
          :options="allProjects"
          :placeholder="task.project"
          label="Project Name"
          option-value="id"
          option-label="name"
          emit-value map-options
          clearable clear-icon="clear"
          hint="Move to a different project?"
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
  name: 'EditTaskDialog',
  mixins: [UseOpusDialog],
  components: { OpusDialog },
  props: {
    task: { type: Object }
  },
  created () {
    this.initialize(this.task)
  },
  data () {
    return {
      model: {
        name: '',
        project: '',
        description: '',
        urgent: false,
        important: false
      }
    }
  },
  computed: {
    ...mapGetters('projects', ['allProjects']),
    hasChanged () {
      return this.model.name !== this.task.name ||
        this.model.description !== this.task.description ||
        this.model.project !== this.task.project ||
        this.model.urgent !== this.task.urgent ||
        this.model.important !== this.task.important
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    initialize (task) {
      if (task) {
        const { name, description, project, urgent, important } = task
        this.model = { name, description, project, urgent, important }
      }
    },
    async save () {
      // the task schema is not nullable,
      // QSelect sets it to null when cleared,
      // Overriding to an empty string
      this.model.project = this.model.project || ''
      await this.updateTask({ id: this.task.id, update: this.model })
      this.$emit('ok')
      this.hide()
    },
    clear () {
      this.model = {
        name: '',
        description: '',
        project: '',
        urgent: false,
        important: false
      }
    }
  }
}
</script>
