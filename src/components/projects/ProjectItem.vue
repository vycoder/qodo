<template>
  <q-item
    @click.stop="$emit('click', project)"
    clickable
    v-ripple:accent
    :class="`rounded-borders bg-${bgColor} ${flat ? '' : 'shadow-light'}`">
    <q-item-section>
      <q-item-label
        lines="1"
        class="text-h6 text-black column q-gutter-y-xs">
        <slot name="title" :project="project">
          {{ project.name }}
        </slot>
        <template v-if="!hideBreakdown">
          <div class="text-caption">
            {{completedTasks}} done / {{ongoingTasks}} in progress / {{notStartedTasks}} to do
          </div>
          <div class="bg-grey-3 rounded-borders">
            <q-linear-progress
              :value="completedProgress"
              :buffer="ongoingProgress"
              rounded color="primary"
              track-color="secondary"/>
          </div>
        </template>
      </q-item-label>
      <q-item-label
        caption
        lines="2"
        :class="{ 'q-pt-sm' : !hideBreakdown }">
        {{ project.description }}
      </q-item-label>
    </q-item-section>
    <q-item-section v-if="$slots.actions" side>
      <slot name="actions" />
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  name: 'ProjectItem',
  props: {
    project: { type: Object, required: true },
    hideBreakdown: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    bgColor: { type: String, default: 'white' }
  },
  computed: {
    tasks () {
      return this.$store.getters['tasks/projectTasks'](this.project)
    },
    completedTasks () {
      return this.tasks
        .filter(task => task.completed)
        .length
    },
    ongoingTasks () {
      return this.tasks
        .filter(task => !task.completed)
        .filter(task => task.progress > 0)
        .length
    },
    notStartedTasks () {
      return this.tasks
        .filter(task => !task.completed)
        .filter(task => task.progress === 0)
        .length
    },
    totalTasks () {
      return this.tasks.length
    },
    ongoingProgress () {
      return this.ongoingTasks === 0 ? 0
        : (this.ongoingTasks / this.totalTasks) + this.completedProgress
    },
    completedProgress () {
      return this.completedTasks === 0 ? 0
        : this.completedTasks / this.totalTasks
    }
  }
}
</script>
