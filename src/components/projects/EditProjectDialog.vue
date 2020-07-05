<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    title="Edit Project">
    <template v-slot:actions>
      <q-btn
        @click="save"
        no-caps rounded
        :disable="!hasChanged || !model.name"
        color="accent"
        icon="done"
        label="Save"
      />
    </template>
    <template>
      <q-card-section class="column q-gutter-y-md">
        <q-input v-model.trim="model.name" label="Project Name" />
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
          v-for="task in taskSelections"
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
            <q-item-label caption>{{task.description}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </opus-dialog>
</template>
<script>
import Utils from 'lib/utils'

import OpusDialog from 'lib/commons/OpusDialog'
import UseOpusDialog from 'lib/commons/opus-dialog-functions'
import NewTaskDialog from 'components/tasks/NewTaskDialog'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditProjectDialog',
  mixins: [UseOpusDialog],
  components: { OpusDialog },
  props: { project: { type: Object, required: true } },
  async created () {
    const { name, description } = this.project
    this.model = { name, description }
    this.selectedTasks = [...this.currentTasks]
  },
  data () {
    return {
      model: {
        name: '',
        description: ''
      },
      selectedTasks: []
    }
  },
  computed: {
    ...mapGetters('tasks', ['orphanTasks', 'projectTasks']),
    hasChanged () {
      return this.model.name !== this.project.name ||
        this.model.description !== this.project.description ||
        !Utils.isArrayEqual(this.selectedTasks, this.currentTasks)
    },
    currentTasks () {
      return this.projectTasks(this.project)
        .map(task => task.id)
    },
    taskSelections () {
      return [
        ...this.projectTasks(this.project),
        ...this.orphanTasks
      ]
    }
  },
  methods: {
    ...mapActions('projects', ['updateProject']),
    ...mapActions('tasks', ['setTaskProject', 'removeTaskProject']),
    async save () {
      await this.updateProject({
        id: this.project.id, update: this.model
      })
      await this.updateTasks(this.project.id)
      this.$emit('ok')
      this.hide()
      this.clear()
    },
    async updateTasks (projectId) {
      await Promise.all([
        ...this.currentTasks // removed tasks
          .filter(taskId => !this.selectedTasks.includes(taskId))
          .map(taskId => this.removeTaskProject(taskId)),
        ...this.selectedTasks // added tasks
          .filter(taskId => !this.currentTasks.includes(taskId))
          .map(taskId => this.setTaskProject({ taskId, projectId }))
      ])
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
    }
  }
}
</script>
