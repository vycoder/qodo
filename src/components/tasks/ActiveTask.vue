<template>
  <section v-if="task">
    <transition
      v-if="task"
      appear mode="out-in"
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp">
      <task-item
        :value="task"
        inner-item-classes="q-pa-md q-px-lg"
        @click="$emit('click', task)">
        <template v-slot:actions>
          <div class="row q-gutter-x-xs">
            <q-btn
              @click.stop="$emit('complete', task)"
              round unelevated
              color="positive"
              icon="done"
              size="xs"/>
            <q-btn
              @click.stop="$emit('close', task)"
              round unelevated
              color="red-4"
              icon="close"
              size="xs"/>
          </div>
        </template>
      </task-item>
    </transition>
  </section>
</template>
<script>
import TaskItem from 'components/tasks/TaskItem'

export default {
  name: 'ActiveTask',
  components: { TaskItem },
  props: {
    task: { type: Object }
  }
}
</script>
