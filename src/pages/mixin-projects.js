import { RootEvents } from 'lib/constants'

import NewProjectDialog from 'components/projects/NewProjectDialog'
import EditProjectDialog from 'components/projects/EditProjectDialog'
import ProjectDetailsDialog from 'components/projects/ProjectDetailsDialog'

export default {
  data () {
    return {
      hasOpenDialog: false,
      editModalOpened: false,
      actions: [
        { label: 'Open', icon: { name: 'fullscreen', color: 'grey' }, handler: this.showProjectDetails },
        { label: 'Edit', icon: { name: 'edit', color: 'blue' }, handler: this.showEditProjectDialog },
        {},
        { label: 'Delete', icon: { name: 'delete', color: 'negative' }, handler: this.confirmDelete }
      ]
    }
  },
  computed: {
    projects () {
      return this.$store
        .getters['projects/allProjects']
        .slice()
        .sort((a, b) => b.updated - a.updated)
    },
    tasks () {
      return this.$store.getters['tasks/projectTasks']
    }
  },
  methods: {
    showEditProjectDialog (project) {
      if (project) {
        this.hasOpenDialog = true
        this.$q.dialog({
          component: EditProjectDialog,
          parent: this,
          project
        }).onDismiss(() => (this.hasOpenDialog = false))
      }
    },
    showNewProjectDialog () {
      this.hasOpenDialog = true
      this.$q.dialog({
        component: NewProjectDialog,
        parent: this
      }).onDismiss(() => (this.hasOpenDialog = false))
    },
    showProjectDetails (project) {
      this.hasOpenDialog = true
      this.$q.dialog({
        component: ProjectDetailsDialog,
        parent: this,
        project
      }).onDismiss(() => (this.hasOpenDialog = false))
    },
    confirmDelete (project) {
      this.hasOpenDialog = true
      this.$o
        .dialog
        .confirmDeleteProject({
          ...project,
          tasks: this.tasks(project)
        })
        .onOk(async () => {
          await this.$store.dispatch('projects/removeProject', { id: project.id })
          await Promise.all([
            ...this.tasks(project)
              .map(task => task.id)
              .map(id => this.$store.dispatch('tasks/removeTask', { id }))
          ])
          this.$root.$emit(RootEvents.ProjectDeleted, { ...project })
        })
        .onDismiss(() => (this.hasOpenDialog = false))
    }
  }
}
