<template>
  <q-card
    rounded flat
    class="inline-block bg-grey-1 column items-center justify-center q-gutter-y-md">
    <q-card-section>
      <div class="column items-center justify-center q-gutter-y-sm">
        <div class="row items-end q-gutter-x-sm">
          <div class="text-h3 text-weight-light text-capitalize">
            {{ currentSprintMode }}
          </div>
          <div class="text-h5 text-weight-thin">
            Sprint {{ currentSprintCount }}
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-circular-progress
        :value="currentProgress"
        show-value
        color="primary"
        track-color="teal-1"
        :thickness="0.12"
        size="17rem">
        <div
          :class="{ 'text-grey': isBreakMode }"
          class="text-weight-light">
          {{mm}}:{{ss}}
        </div>
      </q-circular-progress>
    </q-card-section>
    <q-card-actions align="center">
      <div class="row items-center q-gutter-x-md">
        <q-btn
          @click="reset()"
          flat round size="lg"
          class="shadow-light"
          text-color="black"
          icon="fast_rewind" />
        <q-btn
          @click="start()"
          flat round size="xl"
          class="shadow-light"
          text-color="primary"
          :icon="isRunning ? 'pause' : 'play_arrow'" />
        <q-btn
          @click="skip()"
          flat round size="lg"
          class="shadow-light"
          text-color="black"
          icon="skip_next" />
      </div>
    </q-card-actions>
  </q-card>
</template>
<script>
import useMixin from './mixin'

export default {
  name: 'Pomodoro',
  mixins: [useMixin],
  computed: {
    currentProgress () {
      const elapsedTimeRatio = (this.elapsedSeconds / this.sprintDuration)
      return (this.isBreakMode ? 1 - elapsedTimeRatio : elapsedTimeRatio) * 100
    }
  }
}
</script>
