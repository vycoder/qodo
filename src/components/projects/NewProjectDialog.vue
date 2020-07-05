<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    title="Add Project">
    <template v-slot:actions>
      <q-btn
        @click="save"
        no-caps rounded
        :disable="!model.name"
        color="accent"
        icon="add"
        label="Add Project"
      />
    </template>
    <template>
      <q-card-section class="column q-gutter-y-md">
        <q-input
          v-model.trim="model.name"
          label="Project Name"
          maxlength="30"
          counter
        />
        <q-input
          v-model.trim="model.description"
          label="Project Description"
          type="textarea"
          rows="4"
          maxlength="200"
          bottom-slots
          hint="(Optional)"
          counter
        />
      </q-card-section>
      <q-list>
        <q-item-label header>
          <div class="q-py-sm text-subtitle1">Tasks</div>
          <q-btn
            @click="showNewTaskDialog"
            icon="add"
            color="primary"
            round size="sm"
            style="margin-top: -1rem"
            class="float-right q-mr-sm"
          />
          <q-separator />
        </q-item-label>
        <q-item
          v-for="task in orphanTasks"
          :key="task.id"
          class="rounded-borders"
          v-ripple:primary
          tag="label">
          <q-item-section side top>
            <q-checkbox
              v-model="selectedTasks"
              :val="task.id"
              size="sm"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{task.name}}</q-item-label>
            <q-item-label caption>
              {{task.description}}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </opus-dialog>
</template>
<script>
import UseOpusDialog from 'lib/commons/opus-dialog-functions'
import OpusDialog from 'lib/commons/OpusDialog'
import NewTaskDialog from 'components/tasks/NewTaskDialog'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NewProjectDialog',
  mixins: [UseOpusDialog],
  components: { OpusDialog },
  data () {
    return {
      model: {
        name: '',
        description: ''
      },
      selectedTasks: []
    }
  },
  computed: { ...mapGetters('tasks', ['orphanTasks']) },
  methods: {
    ...mapActions('projects', ['createProject']),
    ...mapActions('tasks', ['setTaskProject']),
    async save () {
      const project = await this.createProject(this.model)
      await this.updateTasks(project)
      this.$emit('ok', project)
      this.hide()
      this.clear()
    },
    clear () {
      this.model = {
        name: '',
        description: ''
      }
      this.selectedTasks = []
    },
    showNewTaskDialog () {
      this.$q.dialog({
        component: NewTaskDialog,
        parent: this
      }).onOk(this.addTask)
    },
    addTask (task) {
      this.selectedTasks.push(task.id)
    },
    async updateTasks ({ id }) {
      return Promise.all(
        this.selectedTasks
          .map(taskId => this.setTaskProject({ taskId, projectId: id }))
      )
    }
  }
}
</script>
