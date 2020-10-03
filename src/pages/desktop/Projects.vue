<template>
  <q-split-layout :title="$route.name">
    <template v-slot:side>
      <q-list>
        <q-item-label header>
          {{ projects.length }} Projects
        </q-item-label>
      </q-list>
      <q-list
        v-if="projects.length"
        class="q-px-sm column q-gutter-y-sm">
        <project-item
          v-for="project in projects"
          @click="selectedProject = project"
          :key="project.id"
          :project="project"
          hide-breakdown flat
          bg-color="none"
          class="q-py-md">
          <template v-slot:title="{ project }">
            <div class="text-subtitle2 text-black ellipsis">
              {{ project.name }}
            </div>
          </template>
          <template v-slot:actions>
            <div class="text-h5 text-weight-light">
              {{tasks(project).length}}
              <span v-if="tasks(project).length === 1" class="text-caption">task</span>
              <span v-else class="text-caption">tasks</span>
            </div>
          </template>
        </project-item>
      </q-list>
      <opus-img-caption
        v-else
        width="170px"
        caption="You currently have 0 Projects"
        src="solution_mindset.svg" />
      <q-page-sticky
        style="z-index: 2001"
        :offset="[18, -18]"
        position="bottom-right">
        <opus-fab
          size="md"
          :show="!hasOpenDialog"
          @click="showNewProjectDialog" />
      </q-page-sticky>
    </template>
    <q-page class="bg-grey-1 fit">
      <opus-img-caption
        v-if="!selectedProject"
        src="art_museum.svg"
        caption="Select a project to view details"
        content-classes="absolute-center text-center z-top"
      />
      <project-details
        v-else
        :project="selectedProject"
        @delete="confirmDelete"
        @edit="showEditProjectDialog"
        class="absolute-center"
      />
    </q-page>
  </q-split-layout>
</template>
<script>
import UseProjects from 'pages/mixin-projects'

import OpusFab from 'lib/commons/OpusFab'
import OpusImgCaption from 'lib/commons/OpusImgCaption'

import ProjectItem from 'components/projects/ProjectItem'
import ProjectDetails from 'components/projects/ProjectDetails'

export default {
  name: 'Projects',
  mixins: [UseProjects],
  components: {
    ProjectItem,
    ProjectDetails,
    OpusFab,
    OpusImgCaption
  },
  data () {
    return {
      selectedProject: null
    }
  }
}
</script>
