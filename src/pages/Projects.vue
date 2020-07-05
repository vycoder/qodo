<template>
  <q-page padding>
    <q-list
      v-if="projects.length"
      class="column q-gutter-y-md q-pt-xs">
      <project-item
        v-for="project in projects"
        @click="showProjectDetails"
        :key="project.id"
        :project="project" flat>
        <template v-slot:actions>
          <opus-more-actions-btn
            :target="project"
            :actions="actions" />
        </template>
      </project-item>
    </q-list>
    <opus-img-caption
      v-else
      caption="You currently have 0 Projects"
      src="solution_mindset.svg" />
    <q-page-sticky
      style="z-index: 2001"
      :offset="[18, -26]"
      position="bottom-right">
      <opus-fab
        :show="!hasOpenDialog"
        @click="showNewProjectDialog" />
    </q-page-sticky>
  </q-page>
</template>
<script>
import UseProjects from 'pages/mixin-projects'

import OpusFab from 'lib/commons/OpusFab'
import OpusImgCaption from 'lib/commons/OpusImgCaption'
import OpusMoreActionsBtn from 'lib/commons/OpusMoreActionsMenuBtn'

import ProjectItem from 'components/projects/ProjectItem'

export default {
  name: 'Projects',
  mixins: [UseProjects],
  components: {
    OpusFab,
    OpusImgCaption,
    ProjectItem,
    OpusMoreActionsBtn
  }
}
</script>
