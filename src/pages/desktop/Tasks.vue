<template>
  <q-split-layout :title="$route.name">
    <template v-slot:side>
      <q-list>
        <q-item-label header>
          <div class="row justify-between items-center">
            <div>{{tasks.length}} Tasks</div>
            <opus-btn-dropdown-select
              v-model="selectedFilter"
              :options="filters"
              class="col-auto" />
          </div>
        </q-item-label>
      </q-list>
      <task-list
        v-if="tasks.length"
        :tasks="tasks"
        :flat="false"
        @click="showTaskDetailsDialog">
        <template v-slot:title="{ task }">
          <div class="text-subtitle2 ellipsis">
            {{ task.name }}
          </div>
        </template>
        <template v-slot:actions="{ task }">
          <opus-more-actions-btn
            :target="task"
            :actions="actions" />
        </template>
      </task-list>
      <opus-img-caption
        v-else
        width="170px"
        src="empty.svg"
        caption="Nothing to see here..."
      />
      <q-page-sticky
        style="z-index: 2001"
        :offset="[18, -18]"
        position="bottom-right">
        <opus-fab
          size="md"
          :show="!hasOpenDialog"
          @click="showNewTaskDialog" />
      </q-page-sticky>
    </template>
    <q-page class="bg-grey-1 fit">
      <div class="window-height flex flex-center">
        <pomodoro />
      </div>
      <div class="absolute-bottom-right q-ma-lg" style="width: 50%">
        <transition
          v-if="activeTask"
          appear mode="out-in"
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutUp">
          <task-item
            :value="activeTask"
            inner-item-classes="q-pa-md q-px-lg"
            @click="showTaskDetailsDialog(activeTask)">
            <template v-slot:actions>
              <div class="row q-gutter-x-xs">
                <q-btn
                  @click.stop="markComplete(activeTask)"
                  round unelevated
                  color="positive"
                  icon="done"
                  size="xs"/>
                <q-btn
                  @click.stop="clearActiveTask"
                  round unelevated
                  color="red-4"
                  icon="close"
                  size="xs"/>
              </div>
            </template>
          </task-item>
        </transition>
      </div>
    </q-page>
  </q-split-layout>
</template>
<script>
import UseTasks from 'pages/mixin-tasks'

import OpusFab from 'lib/commons/OpusFab'
import OpusBtnDropdownSelect from 'lib/commons/OpusBtnDropdownSelect'
import OpusImgCaption from 'lib/commons/OpusImgCaption'
import OpusMoreActionsBtn from 'lib/commons/OpusMoreActionsMenuBtn'

import TaskItem from 'components/tasks/TaskItem'
import TaskList from 'components/tasks/TaskList'
import Pomodoro from 'lib/commons/Pomodoro'

export default {
  name: 'TasksPage',
  mixins: [UseTasks],
  components: {
    TaskList,
    TaskItem,
    Pomodoro,
    OpusFab,
    OpusImgCaption,
    OpusMoreActionsBtn,
    OpusBtnDropdownSelect
  },
  data () {
    return {
      selectedFilter: 'recent',
      filters: [
        { label: 'Recent', value: 'recent' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'To do', value: 'todo' },
        { label: 'Completed', value: 'completed' }
      ]
    }
  }
}
</script>
