<template>
  <full-page-layout>
    <template v-slot:toolbar>
      <q-toolbar>
        <q-toolbar-title class="text-bold">
          {{$route.name}}
        </q-toolbar-title>
        <q-btn icon="pan_tool" flat round>
          <q-tooltip>
            Drag and drop task items across quadrants.
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </template>
    <q-page class="bg-grey-2" padding>
      <section class="row q-col-gutter-md" style="height: 45vh">
        <template v-for="quadrant in quadrantOptions">
          <div :key="quadrant.id" class="col-6 full-height">
            <eisenhower-box
              :active="currentQuadrant === quadrant.id"
              @dragenter="currentQuadrant = quadrant.id"
              @dragover="currentQuadrant = quadrant.id"
              @dragleave="currentQuadrant = null"
              @drop="move(quadrant.id)"
              :title="quadrant.label"
              :icon="quadrant.icon"
              :color="quadrant.color"
              :corner="quadrant.corner"
              :subtitle="quadrant.caption"
              :size="tasks(quadrant.id).length"
              :description="quadrantDescriptions[quadrant.id]">
              <q-card-section class="column q-gutter-y-sm">
                <template v-if="tasks(quadrant.id).length">
                  <div
                    v-for="task in tasks(quadrant.id)"
                    :key="task.id"
                    class="rounded-borders"
                    draggable="true"
                    @dragstart="selectedTaskId = task.id">
                    <task-item
                      :value="task"
                      clickable no-side
                      @click="showTaskDetailsDialog(task)">
                      <template v-slot:title="{ task }">
                        <div class="text-subtitle2 text-grey-10 ellipsis">
                          {{ task.name }}
                        </div>
                      </template>
                      <template v-slot:actions>
                        <q-btn
                          @click.stop="() => {}"
                          flat round dense
                          icon="sync_alt"
                          color="grey"
                          size="sm">
                          <q-menu>
                            <q-list style="min-width: 150px">
                              <q-item-label header>Move to</q-item-label>
                              <template v-for="(menu, i) in getTaskActionsMenu(quadrant.id)">
                                <q-item
                                  v-if="menu.id"
                                  :key="menu.id"
                                  clickable v-close-popup
                                  @click="moveTask(task, menu.id)">
                                  <q-item-section side>
                                    <q-icon :name="menu.icon" :color="menu.color" />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>{{menu.label}}</q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-separator v-else :key="i" />
                              </template>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </template>
                    </task-item>
                  </div>
                </template>
                <opus-img-caption
                  v-else
                  width="170px"
                  :src="emptyQuadrantImg[quadrant.id].src"
                  caption="Nothing to see here..."
                  content-style="height: 30vh;"
                  content-classes="z-top column justify-center items-center q-pt-md"
                />
              </q-card-section>
            </eisenhower-box>
          </div>
        </template>
      </section>
    </q-page>
  </full-page-layout>
</template>
<script>
import UseEisenhower from 'pages/mixin-eisenhower'

import OpusImgCaption from 'lib/commons/OpusImgCaption'

import FullPageLayout from 'layouts/desktop/FullPageLayout'
import EisenhowerBox from 'components/eisenhower/EisenhowerBox'
import TaskItem from 'components/tasks/TaskItem'

export default {
  name: 'Eisenhower',
  mixins: [UseEisenhower],
  components: {
    FullPageLayout,
    EisenhowerBox,
    TaskItem,
    OpusImgCaption
  },
  data () {
    return {
      selectedTaskId: null
    }
  },
  methods: {
    async move (to) {
      this.currentQuadrant = null
      await this.transferToQuadrant(this.selectedTaskId, to)
      this.selectedTaskId = null
    },
    async moveTask (task, to) {
      if (to === 'remove') {
        return this.$o
          .dialog
          .confirmDeleteTask(task)
          .onOk(() => (this.$store.dispatch('tasks/removeTask', { id: task.id })))
      }
      return this.transferToQuadrant(task.id, to)
    },
    getTaskActionsMenu (quadrant) {
      const actions = this.quadrantOptions
        .slice()
        .filter(({ id }) => id !== quadrant)

      if (quadrant === 'delete') {
        actions.push({}, {
          id: 'remove',
          label: 'Delete Task',
          icon: 'delete_forever',
          color: 'red'
        })
      }
      return actions
    }
  }
}
</script>
