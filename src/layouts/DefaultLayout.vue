<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-pl-md q-py-xs bg-white text-primary shadow-light admob-padding">
      <q-toolbar>
        <q-toolbar-title class="underline">
          {{ $route.name }}
        </q-toolbar-title>
        <q-btn
          color="accent"
          flat round dense
          icon="menu_open"
          @click="leftDrawerOpen = true" />
      </q-toolbar>
      <div class="sleeve q-pb-sm"></div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="right"
      bordered
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
  </q-layout>
</template>

<script>
import MenuNav from 'components/MenuNav'
import SideNav from 'components/SideNav'

export default {
  name: 'DefaultLayout',

  components: {
    MenuNav,
    SideNav
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
