export default function () {
  return {
    running: false,
    elapsedSeconds: 0, // in seconds
    sprintMode: 'work',
    sprintCounts: {
      work: 1, break: 1
    },
    sprintDuration: { // in seconds
      work: 60,
      shortBreak: 60,
      longBreak: 120
    }
  }
}
