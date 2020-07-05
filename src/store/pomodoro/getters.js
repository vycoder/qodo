
export function isRunning (state) {
  return state.running
}

export function isWorkMode (state) {
  return state.sprintMode === 'work'
}

export function isBreakMode (state) {
  return state.sprintMode === 'break'
}

export function elapsedSeconds (state) {
  return state.elapsedSeconds
}

export function currentSprintMode (state) {
  return state.sprintMode
}

export function currentSprintCount (state) {
  return state.sprintCounts[state.sprintMode]
}

export function sprintDuration (state) {
  if (state.sprintMode === 'work') {
    return state.sprintDuration.work
  }
  if (currentSprintCount(state) === 4) {
    return state.sprintDuration.longBreak
  }
  return state.sprintDuration.shortBreak
}
