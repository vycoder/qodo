export function setDurations (state, { work, shortBreak, longBreak }) {
  state.sprintDuration.work = work
  state.sprintDuration.shortBreak = shortBreak
  state.sprintDuration.longBreak = longBreak
}

export function start (state) {
  state.running = true
}

export function stop (state) {
  state.running = false
}

export function incrementElapsedSeconds (state) {
  state.elapsedSeconds++
}

export function clearElapsedSeconds (state) {
  state.elapsedSeconds = 0
}

export function updateSprint (state) {
  const currentSprintCount = state.sprintCounts[state.sprintMode]
  state.sprintCounts[state.sprintMode] = currentSprintCount === 4 ? 1 : currentSprintCount + 1
  state.sprintMode = state.sprintMode === 'work' ? 'break' : 'work'
}

export function clear (state) {
  state.running = false
  state.elapsedSeconds = 0
  state.sprintMode = 'work'
  state.sprintCounts.work = 1
  state.sprintCounts.break = 1
}
