<template>
  <q-list
    :class="`q-px-sm column q-gutter-y-${gutterSize}`">
    <task-item
      v-for="task in tasks"
      :key="task.id"
      :value="task"
      :flat="flat"
      :no-side="noSide"
      :content-classes="contentClasses"
      @click="$emit('click', task)">
      <template v-if="$scopedSlots.title" v-slot:title>
        <slot name="title" :task="{ ...task }" />
      </template>
      <template v-if="$scopedSlots.actions" v-slot:actions>
        <slot name="actions" :task="{ ...task }" />
      </template>
    </task-item>
  </q-list>
</template>
<script>
import TaskItem from './TaskItem'
export default {
  name: 'TaskList',
  components: { TaskItem },
  props: {
    tasks: { type: Array, required: true },
    gutterSize: { type: String, default: 'sm' },
    flat: { type: Boolean, default: true },
    noSide: { type: Boolean, default: false },
    contentClasses: { type: String, default: '' }
  }
}
</script>
