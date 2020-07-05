<template>
  <q-card flat class="bg-white">
    <q-card-section class="text-black q-py-lg">
      <div class="column items-center justify-center q-gutter-y-sm">
        <div class="row items-end q-gutter-x-sm">
          <div class="text-h5 text-weight-light text-capitalize">
            {{ currentSprintMode }}
          </div>
          <div class="text-subtitle1 text-weight-thin">
            Sprint {{ currentSprintCount }}
          </div>
        </div>
        <div
          :class="{ 'text-grey': isBreakMode }"
          class="text-h1">
          {{mm}}:{{ss}}
        </div>
      </div>
      <q-card-actions align="center">
        <div class="row items-center q-gutter-x-md">
          <q-btn
            @click="reset()"
            flat round size="md"
            class="shadow-light"
            text-color="black"
            icon="fast_rewind" />
          <q-btn
            @click="start()"
            class="shadow-light"
            text-color="primary"
            flat round size="1.2rem"
            :icon="isRunning ? 'pause' : 'play_arrow'" />
          <q-btn
            @click="skip()"
            flat round size="md"
            class="shadow-light"
            text-color="black"
            icon="skip_next" />
        </div>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
import useMixin from './mixin'

export default {
  name: 'Pomodoro',
  mixins: [useMixin]
}
</script>
