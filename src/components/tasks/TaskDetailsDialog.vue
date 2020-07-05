<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    title="Task Details">
    <template v-slot:actions>
      <q-btn
        v-if="showStartButton"
        @click="startTask(task)"
        class="shadow-light"
        icon="play_arrow"
        color="accent"
        rounded no-caps
        :label="task.progress === 0 ? 'Start' : 'Continue'"
      />
    </template>
    <q-card-section class="column q-gutter-y-md">
      <div class="column q-gutter-y-xs">
        <div class="text-h5">{{task.name}}</div>
        <div class="row justify-between items-center">
          <div v-if="parentProject" class="text-secondary text-subtitle1">
            {{parentProject.name}}
          </div>
          <q-btn
            v-if="task.completed"
            label="completed"
            color="positive"
            unelevated
            rounded
            size="xs" />
        </div>
      </div>
      <q-input
        label="Description"
        type="textarea"
        readonly
        :value="task.description"
      />
      <q-input
        label="Priority"
        :value="priority"
        readonly
      />
      <q-input
        label="Progress"
        :value="task.progress | elapsedTime"
        readonly
      />
      <div class="text-caption text-grey text-italic">
        Last Updated: {{task.updated | formatDate('D MMM YYYY')}}
      </div>
    </q-card-section>
  </opus-dialog>
</template>
<script>
import UseOpusDialog from 'lib/commons/opus-dialog-functions'
import OpusDialog from 'lib/commons/OpusDialog'

import { mapGetters } from 'vuex'

export default {
  name: 'TaskDetailsDialog',
  mixins: [UseOpusDialog],
  components: { OpusDialog },
  props: { task: { type: Object, required: true } },
  computed: {
    ...mapGetters('tasks', ['activeTask']),
    parentProject () {
      if (!this.task.project) {
        return null
      }
      return this.$store.getters['projects/projectById'](this.task.project)
    },
    priority () {
      const isNot = is => is === false ? 'Not ' : ''
      return `${isNot(this.task.important)}Important, ${isNot(this.task.urgent)}Urgent`
    },
    showStartButton () {
      const isCurrentlyActiveTask = this.activeTask ? this.task.id === this.activeTask.id : false
      return !this.task.completed && !isCurrentlyActiveTask
    }
  },
  methods: {
    async startTask (task) {
      if (this.activeTask) {
        await this.$o.pomodoro.updateActiveTask()
      }
      this.$store.commit('tasks/setActiveTask', task)
      this.$store.commit('pomodoro/clear')
      this.$o.pomodoro.start()
      this.hide()
    }
  }
}
</script>
