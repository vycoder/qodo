import { LocalStorage } from 'quasar'
import { toSeconds } from './utils'

const PreferencesKey = 'opus.pref'

const DefaultPreferences = Object.freeze({
  audio: true,
  sprintDuration: {
    work: toSeconds(25),
    shortBreak: toSeconds(5),
    longBreak: toSeconds(15)
  }
})

export default class {
  constructor (store) {
    this.store = store
    this.preferences = null
    this.initialize()
  }

  initialize () {
    if (!LocalStorage.has(PreferencesKey)) {
      LocalStorage.set(PreferencesKey, { ...DefaultPreferences })
    }
    this.preferences = LocalStorage.getItem(PreferencesKey)
    this.store.commit('pomodoro/setDurations', this.preferences.sprintDuration)
  }

  isAudioEnabled () {
    return this.preferences.audio
  }

  getSprintDuration () {
    return this.preferences.sprintDuration
  }

  save ({ audio, sprintDuration: { work, shortBreak, longBreak } }) {
    this.preferences.audio = audio
    this.preferences.sprintDuration = { work, shortBreak, longBreak }
    LocalStorage.set(PreferencesKey, { ...this.preferences })
    this.store.commit('pomodoro/setDurations', this.preferences.sprintDuration)
  }
}
