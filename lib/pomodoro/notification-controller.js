import Notification from 'lib/notifications'

export default class {
  constructor (pomodoro) {
    this.pomodoro = pomodoro
  }

  async workSprintCompleted (sprintCount) {
    const options = {
      message: 'Proceed with a short break?',
      handler: () => this.pomodoro.start()
    }
    if (sprintCount === 4) {
      options.message = 'You have completed 4 consecutive work sprints. Take a long break?'
    }
    return Notification.create('Work Sprint Completed', options)
  }

  async breakSprintCompleted () {
    return Notification.create('Break Sprint Completed', {
      message: 'Continue with a work sprint?',
      handler: () => this.pomodoro.start()
    })
  }
}
