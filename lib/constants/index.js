import { toSeconds } from '../utils'

export const EisenhowerQuadrants = Object.freeze({
  do: { label: 'Do Now', color: 'green', icon: 'check', caption: 'Important and Urgent', corner: 'top-left' },
  decide: { label: 'Decide', color: 'blue', icon: 'timer', caption: 'Important but Not Urgent', corner: 'top-right' },
  delegate: { label: 'Delegate', color: 'orange', icon: 'directions', caption: 'Not Important but Urgent', corner: 'bottom-left' },
  delete: { label: 'Declutter', color: 'red', icon: 'delete_sweep', caption: 'Neither Important nor Urgent', corner: 'bottom-right' }
})

export const EisenhowerQuadrantDescriptions = Object.freeze({
  do: 'These are your current tasks that have clear deadlines and consequences for not taking immediate action. Do these tasks now.',
  decide: 'Tasks without current set deadlines that brings you closer to your goal. Plan what and when to do these tasks. (Often, tasks in this quadrant will eventually be transferred over to other quadrants.)',
  delegate: 'Tasks that need to be done, but don\'t necessarily require your specific expertise - are tasks that you should delegate.',
  delete: 'These are tasks that are ultimately just distractions, avoid them as much as possible. If you can identify and eliminate all of these tasks you\'ll free up much-needed time to invest in <strong>Decide</strong> quadrant.'
})

export const EinserhowerEmptyQuadrantImages = Object.freeze({
  do: { src: 'void.svg' },
  decide: { src: 'decide.svg' },
  delegate: { src: 'voting.svg' },
  delete: { src: 'throw_away.svg' }
})

export const ReportOptions = Object.freeze([
  { name: 'today', label: 'Today', premium: false },
  { name: 'yesterday', label: 'Yesterday', premium: false },
  { name: 'seven', label: 'Last 7 days', premium: false },
  { name: 'fourteen', label: 'Last 14 days', premium: false },
  { name: 'custom', label: 'Custom', premium: true }
])

export const DateKeyFormat = 'YYYYMMDD'

export const SprintDurationOptions = Object.freeze({
  work: [
    { value: toSeconds(5), premium: false },
    { value: toSeconds(10), premium: false },
    { value: toSeconds(15), premium: false },
    { value: toSeconds(20), premium: false },
    { value: toSeconds(25), premium: false },
    { value: toSeconds(30), premium: true },
    { value: toSeconds(45), premium: true },
    { value: toSeconds(60), premium: true }
  ],
  shortBreak: [
    { value: toSeconds(5), premium: false },
    { value: toSeconds(10), premium: false },
    { value: toSeconds(15), premium: true },
    { value: toSeconds(20), premium: true }
  ],
  longBreak: [
    { value: toSeconds(15), premium: false },
    { value: toSeconds(20), premium: false },
    { value: toSeconds(25), premium: true },
    { value: toSeconds(30), premium: true },
    { value: toSeconds(45), premium: true },
    { value: toSeconds(60), premium: true }
  ]
})

export const RootEvents = Object.freeze({
  TaskDeleted: 'task-deleted',
  ProjectDeleted: 'project-deleted'
})

export default {
  RootEvents,
  ReportOptions,
  DateKeyFormat,
  EisenhowerQuadrants,
  EisenhowerQuadrantDescriptions,
  EinserhowerEmptyQuadrantImages
}
