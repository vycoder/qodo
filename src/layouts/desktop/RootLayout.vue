<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      mini
      show-if-above
      :value="true"
      :width="200"
      :breakpoint="500"
      bordered
      no-swipe-open
      no-swipe-close
      no-swipe-backdrop
      content-class="bg-grey-3 column">
      <q-scroll-area class="fit bg-secondary col">
        <q-list padding>
          <q-item
            @click="showAboutDialog"
            clickable
            class="q-mb-md">
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="statics/desktop-sidenav-icon.png" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <q-item
            v-for="menu in menus"
            :key="menu.name"
            :to="menu.path"
            :exact="menu.exact"
            clickable v-ripple class="q-mb-xs text-white"
            active-class="bg-grey-1 shadow-light active">
            <q-item-section avatar>
              <q-icon :name="menu.icon" size="xs" />
            </q-item-section>
            <q-item-section>
              {{ menu.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-list class="q-mt-auto col-auto bg-secondary">
        <q-separator />
        <q-item
          @click="showSettingsDialog"
          dense
          clickable
          v-ripple
          class="text-white">
          <q-item-section avatar>
            <q-icon name="settings" size="xs" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>
<script>
import SettingsDialog from 'components/settings/SettingsDialog'
import AboutDialog from 'components/AboutDialog'

export default {
  name: 'DefaultDesktopLayout',
  data () {
    return {
      menus: [
        { name: 'tasks', path: '/', icon: 'fas fa-tasks', exact: true },
        { name: 'projects', path: '/projects', icon: 'fa fa-laptop-code' },
        { name: 'eisenhower', path: '/eisenhower', icon: 'fas fa-th-large' },
        { name: 'reports', path: '/reports', icon: 'fas fa-chart-pie' }
      ]
    }
  },
  methods: {
    showSettingsDialog () {
      return this.$q.dialog({
        component: SettingsDialog,
        parent: this
      })
    },
    showAboutDialog () {
      return this.$q.dialog({
        component: AboutDialog,
        parent: this
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.q-item {
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}
.active {
  color: $secondary !important;
}

</style>
