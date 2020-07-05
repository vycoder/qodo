<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    title="Project Details">
    <q-card-section class="column q-gutter-y-md">
      <div>
        <div class="text-h5">{{project.name}}</div>
        <div class="text-caption text-grey-8">
          {{tasks('completed').length}} done / {{tasks('ongoing').length}} in progress / {{tasks('todo').length}} to do
        </div>
      </div>
      <div class="column">
        <div class="q-field__label text-caption">Description</div>
        <div class="description">
          {{project.description}}
        </div>
      </div>
      <div class="text-caption text-grey text-italic">
        Last Updated: {{project.updated | formatDate('D MMM YYYY')}}
      </div>
      <opus-btn-toggle
        v-model="selectedFilter"
        :options="filters"
        class="q-gutter-x-sm q-mt-lg"
      />
      <q-list
        v-if="selectedTasks.length"
        class="q-pa-none">
        <q-item
          v-for="task in selectedTasks"
          :key="task.id"
          class="q-px-none">
          <q-item-section>
            <q-item-label>{{task.name}}</q-item-label>
            <q-item-label caption lines="2">{{task.description}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon v-if="task.completed" name="done" color="positive" />
            <q-icon v-else-if="task.progress > 0" name="timelapse" color="secondary" />
            <q-icon v-else name="radio_button_unchecked" color="grey" />
          </q-item-section>
        </q-item>
      </q-list>
      <opus-img-caption
        v-else
        width="170px"
        src="taken.svg"
        class="q-mt-xl"
        caption="Nothing  to see here.."
        content-style="height: calc(100vh - 50rem);" />
    </q-card-section>
  </opus-dialog>
</template>
<script>
import UseProjectDetails from './project-details'
import UseOpusDialog from 'lib/commons/opus-dialog-functions'

import OpusDialog from 'lib/commons/OpusDialog'
import OpusBtnToggle from 'lib/commons/OpusBtnToggle'
import OpusImgCaption from 'lib/commons/OpusImgCaption'

export default {
  name: 'ProjectDetails',
  mixins: [UseProjectDetails, UseOpusDialog],
  components: {
    OpusDialog,
    OpusBtnToggle,
    OpusImgCaption
  },
  props: { project: { type: Object, required: true } }
}
</script>
<style lang="scss" scoped>
.description {
  border-bottom: 1px dashed $grey-5;
  padding-bottom: 5px;
  min-height: 3rem;
}

</style>
