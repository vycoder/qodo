export default class {
  constructor (prefs) {
    this.prefs = prefs
    this.ticktock = new Audio('statics/media/start.mp3')
    this.wind = new Audio('statics/media/restart.mp3')
    this.ping = new Audio('statics/media/ping.mp3')
    this.halt = new Audio('statics/media/pause.mp3')
  }

  start () {
    this._stop(this.wind)
    this._play(this.ticktock)
  }

  pause () {
    this._stop(this.ticktock)
    this._play(this.halt)
  }

  stop () {
    this._stop(this.ticktock)
    this._play(this.wind)
  }

  completed () {
    this._stop(this.wind)
    this._play(this.ping)
  }

  _play (track) {
    if (this.prefs.isAudioEnabled()) {
      track.play()
    }
  }

  _stop (track) {
    track.pause()
    track.currentTime = 0
  }
}
