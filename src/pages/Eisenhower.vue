<template>
  <q-page padding>
    <q-tab-panels
      v-model="currentQuadrant"
      animated swipeable
      style="background: none">
      <q-tab-panel
        v-for="quadrant in quadrantOptions"
        :key="quadrant.id"
        :name="quadrant.id"
        class="q-px-none"
        style="background: none">
        <q-card flat>
          <q-card-section class="q-py-none">
            <eisenhower-tab-label
              @click="showDescription = !showDescription"
              :value="currentQuadrant"
              :quadrants="quadrants" />
            <eisenhower-tab-descriptions
              v-model="showDescription"
              :color="quadrants[currentQuadrant].color">
              <div v-html="quadrantDescriptions[currentQuadrant]" />
            </eisenhower-tab-descriptions>
          </q-card-section>
        </q-card>
        <q-list
          v-if="tasks(currentQuadrant).length"
          class="column q-gutter-y-sm q-pb-xl q-mt-sm">
          <task-item
            v-for="task in tasks(currentQuadrant)"
            :key="task.id"
            :value="task"
            flat
            no-side
            @click="showTaskDetailsDialog(task)">
            <template v-slot:title="{ task }">
              <div class="text-subtitle2 text-grey-10 ellipsis">
                {{ task.name }}
              </div>
            </template>
            <template v-slot:actions>
              <q-btn
                @click.stop="showMoveOptions(task)"
                flat round dense
                icon="sync_alt"
                color="grey"
                size="sm" />
            </template>
          </task-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
    <opus-img-caption-group
      v-if="!tasks(currentQuadrant).length"
      :value="currentQuadrant"
      context-classes="q-mt-xl"
      :options="emptyQuadrantImg" />
    <q-page-sticky
      style="z-index: 2001"
      :offset="[18, -26]"
      position="bottom-right">
      <opus-fab
        appear
        icon="sync_alt"
        :show="!hasOpenDialog"
        @click="showTabChooser" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import UseEisenhower from 'pages/mixin-eisenhower'

import OpusFab from 'lib/commons/OpusFab'
import OpusImgCaptionGroup from 'lib/commons/OpusImgCaptionGroup'

import EisenhowerTabLabel from 'components/eisenhower/EisenhowerTabLabel'
import EisenhowerTabDescriptions from 'components/eisenhower/EisenhowerTabDescriptions'

import TaskItem from 'components/tasks/TaskItem'

import EisenhowerTabChooserDialog from 'components/eisenhower/EisenhowerTabChooserDialog'

export default {
  name: 'EisenhowerMatrixPage',
  mixins: [UseEisenhower],
  components: {
    OpusImgCaptionGroup,
    OpusFab,
    TaskItem,
    EisenhowerTabLabel,
    EisenhowerTabDescriptions
  },
  created () {
    this.currentQuadrant = 'do'
  },
  data () {
    return {
      showDescription: false
    }
  },
  methods: {
    showTabChooser () {
      this.hasOpenDialog = true
      this.$q.dialog({
        component: EisenhowerTabChooserDialog,
        parent: this,
        quadrants: this.quadrants
      })
        .onOk(quadrant => (this.currentQuadrant = quadrant))
        .onDismiss(() => (this.hasOpenDialog = false))
    },
    showMoveOptions (task) {
      const actions = this.quadrantOptions
        .slice()
        .filter(({ id }) => id !== this.currentQuadrant)

      if (this.currentQuadrant === 'delete') {
        actions.push({}, {
          id: 'remove',
          label: 'Delete Task',
          icon: 'delete_forever',
          color: 'red'
        })
      }

      this.$q.bottomSheet({ message: 'Move to', actions })
        .onOk(({ id }) => {
          switch (id) {
            case 'do':
            case 'decide':
            case 'delegate':
            case 'delete':
              return this.transferToQuadrant(task.id, id)
            case 'remove':
            default:
              this.$o
                .dialog
                .confirmDeleteTask(task)
                .onOk(() => (this.$store.dispatch('tasks/removeTask', { id: task.id })))
          }
        })
    }
  }
}
</script>
