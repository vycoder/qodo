<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    title="Preferences">
    <template v-slot:actions>
      <q-btn
        :disable="!hasChanged"
        @click="save"
        no-caps rounded
        color="accent"
        icon="done"
        label="Save" />
    </template>
    <template>
      <q-list>
        <q-item-label header>
          Audio Settings
        </q-item-label>
        <q-item tag="label" v-ripple class="rounded-borders">
          <q-item-section side top>
            <q-checkbox v-model="model.soundEnabled" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Enable Sound</q-item-label>
            <q-item-label caption>
              Audio notifications when timer starts, pauses or stops.
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced/>
        <q-item-label header>
          Sprint Settings
        </q-item-label>
        <q-item>
          <q-item-section>
            <q-select
              :value="model.sprintDuration.work"
              @input="option => premiumGuardUpdate(option, model.sprintDuration, 'work')"
              :options="options.sprintDuration.work"
              label="Work Sprint Duration"
              stack-label filled square map-options
              hint="How long should the work sprints be?"
              :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'">
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                  </q-item-section>
                  <q-item-section v-if="scope.opt.premium && !$o.app.isPremium()" side>
                    <q-badge color="amber" label="Premium" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              :value="model.sprintDuration.shortBreak"
              @input="option => premiumGuardUpdate(option, model.sprintDuration, 'shortBreak')"
              :options="options.sprintDuration.shortBreak"
              label="Short Break Duration"
              stack-label filled square map-options
              hint="How long should the short breaks be?"
              :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'">
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                  </q-item-section>
                  <q-item-section v-if="scope.opt.premium && !$o.app.isPremium()" side>
                    <q-badge color="amber" label="Premium" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              :value="model.sprintDuration.longBreak"
              @input="option => premiumGuardUpdate(option, model.sprintDuration, 'longBreak')"
              :options="options.sprintDuration.longBreak"
              label="Long Break Duration"
              hint="How about the long breaks?"
              stack-label filled square map-options
              :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'">
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label v-html="scope.opt.label" />
                  </q-item-section>
                  <q-item-section v-if="scope.opt.premium && !$o.app.isPremium()" side>
                    <q-badge color="amber" label="Premium" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </opus-dialog>
</template>
<script>
import { SprintDurationOptions } from 'lib/constants'
import { inMinutes } from 'lib/utils'

import OpusDialog from 'lib/commons/OpusDialog'
import UseOpusDialog from 'lib/commons/opus-dialog-functions'
import UsePremiumGuard from 'lib/commons/premium-guard/premium-guard-mixin'

const mapOptions = option => ({ ...option, label: `${inMinutes(option.value)} minutes` })

export default {
  name: 'SettingsDialog',
  mixins: [
    UseOpusDialog,
    UsePremiumGuard
  ],
  components: { OpusDialog },
  created () {
    this.model.soundEnabled = this.$o.preferences.isAudioEnabled()
    const sprintDuration = this.$o.preferences.getSprintDuration()
    this.model.sprintDuration = { ...sprintDuration }
  },
  data () {
    return {
      model: {
        soundEnabled: false,
        sprintDuration: {
          work: 0,
          shortBreak: 0,
          longBreak: 0
        }
      }
    }
  },
  computed: {
    options () {
      return {
        sprintDuration: {
          work: SprintDurationOptions.work.map(mapOptions),
          shortBreak: SprintDurationOptions.shortBreak.map(mapOptions),
          longBreak: SprintDurationOptions.longBreak.map(mapOptions)
        }
      }
    },
    hasChanged () {
      const sprintDurations = this.$o.preferences.getSprintDuration()
      const { work, shortBreak, longBreak } = this.model.sprintDuration
      return this.model.soundEnabled !== this.$o.preferences.isAudioEnabled() ||
        work !== sprintDurations.work ||
        shortBreak !== sprintDurations.shortBreak ||
        longBreak !== sprintDurations.longBreak
    }
  },
  methods: {
    save () {
      if (!this.hasChanged) {
        return
      }
      this.$o.preferences.save({
        audio: this.model.soundEnabled,
        sprintDuration: {
          ...this.model.sprintDuration
        }
      })
      this.$q.notify({
        type: 'info',
        message: 'Saved',
        caption: 'Successfully updated preferences.',
        position: 'top-right'
      })
      this.hide()
    }
  }
}
</script>
