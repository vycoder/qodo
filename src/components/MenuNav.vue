<template>
  <q-tabs
    align="left"
    class="text-grey-5"
    active-color="secondary"
    :breakpoint="0"
    switch-indicator
    narrow-indicator
    >
    <q-route-tab icon="fas fa-tasks" to="/" exact />
    <q-route-tab icon="fas fa-laptop-code" to="/o/projects" exact />
    <q-route-tab icon="fas fa-th-large" to="/o/eisenhower" exact />
    <q-route-tab icon="fas fa-chart-pie" to="/o/reports" exact />
  </q-tabs>
</template>
<script>
export default {
  name: 'MenuNav'
}
</script>
