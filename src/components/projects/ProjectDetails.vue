<template>
  <q-card class="bg-white shadow-light rounded-borders q-pa-sm" style="width: 80%">
    <div
      class="absolute-top-right z-top q-gutter-x-xs"
      style="margin-top: -8px;">
      <q-btn
        @click="$emit('edit', project)"
        size="xs"
        icon="edit"
        color="blue"
        round unelevated
        class="shadow-light"
        />
      <q-btn
        @click="$emit('delete', project)"
        size="xs"
        icon="delete"
        color="negative"
        round unelevated
        class="shadow-light" />
    </div>
    <q-card-section class="q-pb-xs">
      <div class="text-primary text-h6 text-weight-bold">
        {{ project.name }}
      </div>
      <div class="text-caption">
        {{tasks('completed').length}} done / {{tasks('ongoing').length}} in progress / {{tasks('todo').length}} to do
      </div>
      <div class="bg-grey-3 rounded-borders q-mt-sm q-mb-sm">
        <q-linear-progress
          :value="completedProgress"
          :buffer="ongoingProgress"
          rounded color="primary"
          track-color="secondary"/>
      </div>
      <div class="text-body2 text-grey">{{project.description}}</div>
    </q-card-section>
    <q-card-section>
      <div class="row justify-between items-center">
        <opus-btn-toggle
          v-model="selectedFilter"
          :options="filters"
          class="q-gutter-x-sm"
        />
        <div class="text-grey">
          {{ selectedTasks.length }} tasks
        </div>
      </div>
      <q-scroll-area
        :thumb-style="thumbStyle"
        class="q-mt-md"
        style="height: 40vh; max-width: 100%;">
        <task-list
          v-if="selectedTasks.length"
          :tasks="selectedTasks"
          @click="showTaskDetailsDialog"
          :flat="false" no-side>
          <template v-slot:title="{ task }">
            <div class="text-subtitle2 ellipsis">
              {{ task.name }}
            </div>
          </template>
          <template v-slot:actions="{ task }">
            <div class="row q-gutter-x-xs">
              <q-btn
                @click.stop="showEditTaskDialog(task)"
                size="xs"
                unelevated round
                icon="edit" color="blue"
                />
              <q-btn
                @click.stop="deleteTask(task)"
                size="xs"
                unelevated round
                icon="delete" color="negative" />
            </div>
          </template>
        </task-list>
        <opus-img-caption
          v-else
          width="170px"
          src="taken.svg"
          class="q-mt-xl"
          caption="Nothing  to see here.."
          content-style="margin-top: 5rem"
          />
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>
<script>
import UseProjectDetails from './project-details'
import UseTasksDialogs from 'pages/mixin-tasks-dialogs'

import OpusBtnToggle from 'lib/commons/OpusBtnToggle'
import OpusImgCaption from 'lib/commons/OpusImgCaption'

import TaskList from 'components/tasks/TaskList'

export default {
  name: 'ProjectDetails',
  mixins: [UseProjectDetails, UseTasksDialogs],
  props: {
    project: { type: Object, required: true }
  },
  components: {
    OpusBtnToggle,
    OpusImgCaption,
    TaskList
  },
  data () {
    return {
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  computed: {
    ongoingProgress () {
      const ongoingTasks = this.tasks('ongoing').length
      return ongoingTasks === 0 ? 0
        : (ongoingTasks / this.tasks('all').length) + this.completedProgress
    },
    completedProgress () {
      const completedTasks = this.tasks('completed').length
      return completedTasks === 0 ? 0
        : completedTasks / this.tasks('all').length
    }
  }
}
</script>
