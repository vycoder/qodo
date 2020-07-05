<template>
  <q-list>
    <q-item header class="column items-center q-pt-xl q-pb-lg">
      <q-avatar size="6rem" rounded>
        <img src="~assets/icon.png">
      </q-avatar>
      <div class="q-mt-md text-center">
        <div class="text-subtitle1">{{$o.app.name}}</div>
        <div class="text-caption text-grey">{{$o.app.version}}</div>
      </div>
    </q-item>
    <q-separator spaced />
    <q-item
      v-for="menu in menus"
      :key="menu.name"
      :to="menu.path"
      :exact="menu.exact"
      clickable v-ripple>
      <q-item-section avatar>
        <q-icon :name="menu.icon" size="xs" />
      </q-item-section>
      <q-item-section>
        {{ menu.name }}
      </q-item-section>
    </q-item>
    <q-separator spaced />
    <q-item
      @click="showAboutDialog"
      class="rounded-borders"
      clickable
      v-ripple>
      <q-item-section avatar>
        <q-icon name="adb" />
      </q-item-section>
      <q-item-section>
        <q-item-label>About enFocus</q-item-label>
        <q-item-label caption>Notes, Privacy Policy, etc</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-if="!isPremium"
      @click="showUpgradeToPremium"
      class="rounded-borders"
      clickable
      v-ripple>
      <q-item-section avatar>
        <q-icon name="emoji_events" color="amber" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Upgrade to Premium</q-item-label>
        <q-item-label caption>No ads, more options, etc.</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-else
      @click="$o.iap.store.manageSubscriptions()"
      class="rounded-borders"
      clickable
      v-ripple>
      <q-item-section avatar>
        <q-icon name="emoji_events" color="amber" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Premium Subscription</q-item-label>
        <q-item-label caption>Manage your subscription</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator spaced />
    <q-item
      @click="showSettingsDialog"
      class="rounded-borders"
      clickable
      v-ripple>
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Preferences</q-item-label>
        <q-item-label caption>General Settings</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import PremiumGuardDialog from 'lib/commons/premium-guard/PremiumGuardDialog'
import SettingsDialog from 'components/settings/SettingsDialog'
import AboutDialog from 'components/AboutDialog'

export default {
  name: 'SideNav',
  created () {
    this.isPremium = this.$o.app.isPremium()
  },
  data () {
    return {
      isPremium: false,
      menus: [
        { name: 'Tasks', path: '/', icon: 'fas fa-tasks', exact: true },
        { name: 'Projects', path: '/o/projects', icon: 'fa fa-laptop-code' },
        { name: 'Prioritize', path: '/o/eisenhower', icon: 'fas fa-th-large' },
        { name: 'Reports', path: '/o/reports', icon: 'fas fa-chart-pie' }
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
    },
    showUpgradeToPremium () {
      return this.$q.dialog({
        component: PremiumGuardDialog,
        parent: this
      }).onDismiss(() => (this.isPremium = this.$o.app.isPremium()))
    }
  }
}
</script>
