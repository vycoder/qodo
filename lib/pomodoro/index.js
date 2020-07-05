import Vue from 'vue'
import Notification from './notification-controller'
import AudioController from './audio-controller'

export const PomodoroEvents = {
  Tick: 'tick',
  Update: 'update',
  Start: 'start',
  Stop: 'stop',
  Reset: 'reset'
}

export default class {
  constructor (store, prefs) {
    this.store = store
    this.eventBus = new Vue()
    this.audio = new AudioController(prefs)
    this.notifcation = new Notification(this)
    this.updateLock = false
    this.time = null
    this.initialize()
  }

  initialize () {
    this.timer = setInterval(() => {
      if (!this.store.getters['pomodoro/isRunning']) {
        return
      }
      const elapsedSeconds = this.store.getters['pomodoro/elapsedSeconds']
      if (elapsedSeconds < this.store.getters['pomodoro/sprintDuration']) {
        this.store.commit('pomodoro/incrementElapsedSeconds')
        this.emit(PomodoroEvents.Tick)
        return
      }
      this.updateActiveTask()
        .then(() => {
          this.store.commit('pomodoro/clearElapsedSeconds')
          this.store.commit('pomodoro/stop')
          this.showNotifications()
          this.updateSprint()
          this.audio.completed()
        })
    }, 1000)
  }

  start () {
    if (this.store.getters['pomodoro/isRunning']) {
      this.store.commit('pomodoro/stop')
      this.emit(PomodoroEvents.Stop)
      this.audio.pause()
      return
    }
    this.store.commit('pomodoro/start')
    this.emit(PomodoroEvents.Start)
    this.audio.start()
  }

  reset () {
    this.store.commit('pomodoro/stop')
    this.store.commit('pomodoro/clearElapsedSeconds')
    this.emit(PomodoroEvents.Reset)
    this.audio.stop()
  }

  async updateActiveTask () {
    const elapsedTime = this.store.getters['pomodoro/elapsedSeconds']
    if (this.store.getters['pomodoro/isBreakMode'] ||
        elapsedTime <= 0 || this.updateLock) {
      return Promise.resolve()
    }
    this.updateLock = true
    return this.store
      .dispatch('tasks/updateActiveTaskProgress', elapsedTime)
      .then(() => (this.updateLock = false))
  }

  skip () {
    this.updateActiveTask()
      .then(() => {
        this.reset()
        this.updateSprint()
        this.audio.completed()
      })
  }

  updateSprint () {
    this.store.commit('pomodoro/updateSprint')
    this.emit(PomodoroEvents.Update)
  }

  showNotifications () {
    if (this.store.getters['pomodoro/isBreakMode']) {
      this.notifcation.breakSprintCompleted()
      return
    }
    this.notifcation.workSprintCompleted(this.store.getters['pomodoro/currentSprintCount'])
  }

  emit (event) {
    this.eventBus.$emit(event, {
      eventName: event,
      sprintCount: this.store.getters['pomodoro/currentSprintCount'],
      sprintMode: this.store.getters['pomodoro/currentSprintMode'],
      elapsedSeconds: this.store.getters['pomodoro/elapsedSeconds'],
      running: this.store.getters['pomodoro/isRunning']
    })
  }

  tearDown () {
    clearInterval(this.timer)
    Object.keys(PomodoroEvents)
      .map(eventName => eventName.toLowerCase())
      .forEach(eventName => (this.eventBus.$off(eventName)))
  }

  register (cb) {
    Object.keys(PomodoroEvents)
      .map(eventName => eventName.toLowerCase())
      .forEach(eventName => (this.eventBus.$on(eventName, cb)))
  }

  unRegister (event, cb) {
    this.eventBus.$off(event, cb)
  }

  registerOn (event, cb) {
    this.eventBus.$on(event, cb)
  }
}
