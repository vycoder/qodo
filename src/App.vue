<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    return Promise.all([
      this.$store.dispatch('tasks/fetchTasks'),
      this.$store.dispatch('projects/fetchProjects')
    ])
  },
  beforeDestroy () {
    this.$o.tearDown()
  }
}
</script>
