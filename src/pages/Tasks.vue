<template>
  <q-page padding>
    <transition
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp">
      <q-list
        v-if="activeTask"
        class="q-pb-md bg-white active-task">
        <q-item-label
          header
          class="text-subtitle1 text-bold text-grey-7 q-py-xs">
          Ongoing
        </q-item-label>
        <task-item
          :value="activeTask"
          left-color="positive"
          right-color="grey-5"
          inner-item-classes="q-pa-md"
          @swipeLeft="markComplete"
          @swipeRight="(t, reset) => clearActiveTask(reset)"
          @click="showTaskDetailsDialog(activeTask)">
          <template v-slot:swipe-left>
            <q-icon name="done" />Mark as Completed
          </template>
          <template v-slot:swipe-right>
            <q-icon name="close" />Cancel
          </template>
          <template v-slot:actions>
            <div class="row q-gutter-x-xs">
              <q-btn
                @click.stop="markComplete(activeTask)"
                round unelevated
                color="positive"
                icon="done"
                size="xs"/>
              <q-btn
                @click.stop="clearActiveTask()"
                round unelevated
                color="red-4"
                icon="close"
                size="xs"/>
            </div>
          </template>
        </task-item>
      </q-list>
    </transition>
    <div class="row q-gutter-x-xs items-center text-subtitle1 q-pt-sm q-pb-md q-pl-sm q-pr-md bg-white">
      <opus-btn-toggle
        v-model="selectedFilter"
        :options="filters"
        class="q-gutter-x-xs"
        nullable />
      <div class="q-ml-auto text-grey">
        <template v-if="!selectedFilter">
          <span class="text-caption">All Tasks</span>
        </template>
        <template v-else-if="selectedFilter.length === 1">
          1 <span class="text-caption">task</span>
        </template>
        <template v-else>
          {{tasks.length | shortenNum}} <span class="text-caption">tasks</span>
        </template>
      </div>
    </div>
    <q-list
      v-if="tasks.length"
      class="column q-gutter-y-sm q-pb-xl">
      <template v-if="selectedFilter !== 'completed'">
        <task-item
          v-for="task in tasks"
          :key="task.id"
          :value="task" flat
          left-color="accent"
          right-color="positive"
          @swipeLeft="startTask"
          @swipeRight="markComplete"
          @click="showTaskDetailsDialog(task)">
          <template v-slot:swipe-left>
            <q-icon name="play_arrow" /> Start
          </template>
          <template v-slot:swipe-right>
            <q-icon left name="done" /> Mark as Completed
          </template>
          <template v-slot:actions>
            <opus-more-actions-btn
              :target="task"
              :actions="actions" />
          </template>
        </task-item>
      </template>
      <template v-else>
        <task-list
          :tasks="tasks" flat
          @click="showTaskDetailsDialog">
          <template v-slot:actions="{ task }">
            <opus-more-actions-btn
              :target="task"
              :actions="actions" />
          </template>
        </task-list>
      </template>
    </q-list>
    <opus-img-caption
      v-else
      width="170px"
      src="empty.svg"
      caption="Nothing to see here..."
      content-style="height: calc(100vh - 27rem)"
      content-classes="column flex flex-center text-center" />
    <q-page-sticky
      style="z-index: 2001"
      :offset="[18, -26]"
      position="bottom-right">
      <opus-fab
        :show="!hasOpenDialog"
        @click="showNewTaskDialog" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import OpusFab from 'lib/commons/OpusFab'
import OpusBtnToggle from 'lib/commons/OpusBtnToggle'
import OpusImgCaption from 'lib/commons/OpusImgCaption'
import OpusMoreActionsBtn from 'lib/commons/OpusMoreActionsMenuBtn'

import TaskItem from 'components/tasks/TaskItem'
import TaskList from 'components/tasks/TaskList'

import UseTasks from 'pages/mixin-tasks'

export default {
  name: 'TasksPage',
  mixins: [UseTasks],
  components: {
    OpusFab,
    TaskItem,
    TaskList,
    OpusBtnToggle,
    OpusImgCaption,
    OpusMoreActionsBtn
  },
  data () {
    return {
      selectedFilter: '',
      filters: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'To do', value: 'todo' },
        { label: 'Completed', value: 'completed' }
      ]
    }
  }
}
</script>
