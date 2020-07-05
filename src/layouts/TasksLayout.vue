<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white shadow-light admob-padding">
      <q-toolbar class="q-pl-md">
        <q-toolbar-title class="underline text-primary">
          {{ $route.name }}
        </q-toolbar-title>
        <q-btn
          color="accent"
          flat round dense
          icon="fullscreen"
          @click="goFullScreen" />
      </q-toolbar>
      <div class="sleeve">
        <pomodoro />
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="right"
      content-class="bg-grey-1 admob-padding">
      <side-nav />
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-footer class="bg-white shadow-1">
      <menu-nav />
    </q-footer>
    <q-dialog v-model="fullScreenMode" maximized>
      <q-card>
        <q-btn
          flat round
          color="grey"
          icon="close"
          class="absolute-top-right q-ma-xs admob-padding"
          @click="exitFullScreen">
          <q-tooltip>Exit FullScreen mode</q-tooltip>
        </q-btn>
        <div class="absolute-center q-pb-xl">
          <pomodoro />
        </div>
        <div
          v-if="activeTask"
          class="q-pa-lg absolute-bottom">
          <task-item
            :value="activeTask"
            left-color="positive"
            right-color="grey-5"
            inner-item-classes="q-pa-md"
            @swipeLeft="markComplete"
            @swipeRight="(t, reset) => clearActiveTask(reset)">
            <template v-slot:swipe-left>
              <q-icon name="done" />Mark as Completed
            </template>
            <template v-slot:swipe-right>
              <q-icon name="close" />Cancel
            </template>
            <template v-slot:actions>
              <div class="row q-gutter-x-xs">
                <q-btn
                  @click.stop="markComplete(activeTask)"
                  round unelevated
                  color="positive"
                  icon="done"
                  size="xs"/>
                <q-btn
                  @click.stop="clearActiveTask"
                  round unelevated
                  color="red-4"
                  icon="close"
                  size="xs"/>
              </div>
            </template>
          </task-item>
        </div>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import Pomodoro from 'lib/commons/Pomodoro'
import MenuNav from 'components/MenuNav'
import SideNav from 'components/SideNav'
import TaskItem from 'components/tasks/TaskItem'

import { mapGetters } from 'vuex'

export default {
  name: 'TasksLayout',
  components: {
    TaskItem,
    Pomodoro,
    MenuNav,
    SideNav
  },
  data () {
    return {
      leftDrawerOpen: false,
      fullScreenMode: false
    }
  },
  computed: { ...mapGetters('tasks', ['activeTask']) },
  methods: {
    async clearActiveTask (reset = () => {}) {
      await this.$o.pomodoro.updateActiveTask()
      this.$store.commit('tasks/clearActiveTask')
      this.$store.commit('pomodoro/clear')
      reset()
    },
    async markComplete (task, reset = () => {}) {
      if (this.activeTask && this.activeTask.id === task.id) {
        await this.clearActiveTask()
      }
      reset()
      return this.$store.dispatch('tasks/updateTask', {
        id: task.id,
        update: { completed: true }
      })
    },
    async goFullScreen () {
      await this.$q.fullscreen.request()
      this.fullScreenMode = true
    },
    async exitFullScreen () {
      await this.$q.fullscreen.exit()
      this.fullScreenMode = false
    }
  }
}
</script>
