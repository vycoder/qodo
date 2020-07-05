import {
  EisenhowerQuadrants,
  EinserhowerEmptyQuadrantImages,
  EisenhowerQuadrantDescriptions
} from 'lib/constants'

import TaskDetailsDialog from 'components/tasks/TaskDetailsDialog'

export default {
  data () {
    return {
      hasOpenDialog: false,
      currentQuadrant: '',
      quadrants: EisenhowerQuadrants,
      quadrantOptions: Object.keys(EisenhowerQuadrants)
        .map(key => ({
          id: key,
          ...EisenhowerQuadrants[key]
        })),
      selectedTaskId: null,
      quadrantDescriptions: EisenhowerQuadrantDescriptions,
      emptyQuadrantImg: EinserhowerEmptyQuadrantImages
    }
  },
  computed: {
    tasks () {
      return id => {
        const allTasks = this.$store.getters['tasks/allTasks'].filter(task => !task.completed)
        switch (id) {
          case 'do':
            return allTasks.filter(({ important, urgent }) => important && urgent)
          case 'decide':
            return allTasks.filter(({ important, urgent }) => important && !urgent)
          case 'delegate':
            return allTasks.filter(({ important, urgent }) => !important && urgent)
          case 'delete':
            return allTasks.filter(({ important, urgent }) => !important && !urgent)
          default:
            return allTasks
        }
      }
    }
  },
  methods: {
    async transferToQuadrant (taskId, to) {
      let update = null
      switch (to) {
        case 'do':
          update = { important: true, urgent: true }
          break
        case 'decide':
          update = { important: true, urgent: false }
          break
        case 'delegate':
          update = { important: false, urgent: true }
          break
        case 'delete':
          update = { important: false, urgent: false }
          break
      }
      if (update && taskId) {
        return this.$store.dispatch('tasks/updateTask', { id: taskId, update })
      }
    },
    showTaskDetailsDialog (task) {
      this.hasOpenDialog = true
      this.$q.dialog({
        component: TaskDetailsDialog,
        parent: this,
        task
      }).onDismiss(() => (this.hasOpenDialog = false))
    }
  }
}
