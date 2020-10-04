export default {
  data () {
    return {
      selectedFilter: 'all',
      filters: [
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'To do', value: 'todo' },
        { label: 'Completed', value: 'completed' },
        { label: 'All', value: 'all' }
      ]
    }
  },
  computed: {
    tasks () {
      return (filter) => {
        const tasks = this.$store.getters['tasks/projectTasks'](this.project)
        if (filter === 'completed') {
          return tasks.filter(task => task.completed)
        } else if (filter === 'ongoing') {
          return tasks
            .filter(task => !task.completed)
            .filter(task => task.progress > 0)
        } else if (filter === 'todo') {
          return tasks.filter(task => task.progress === 0)
        } else {
          return tasks
        }
      }
    },
    selectedTasks () {
      return this.tasks(this.selectedFilter)
    }
  }
}
