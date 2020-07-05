import { scroll, date } from 'quasar'
import { DateKeyFormat } from '../constants'

const { getScrollTarget, setScrollPosition } = scroll

const converter = (value, divisor, pad) => {
  const res = Math.floor(value / divisor)
  if (pad) {
    return `${res}`.padStart(pad, '0')
  }
  return `${res}`
}

export const toSeconds = minutes => minutes * 60

export const inMinutes = (seconds, pad) => converter(seconds, 60, pad)

export const inHours = (seconds, pad) => converter(seconds, (60 * 60), pad)

export const padZero = (val, length) => `${val}`.padStart(length, '0')

export const elapsedTime = (seconds, long = false) => {
  const [hh, mm] = [60 * 60, 60]
  let remaining = seconds
  const res = []
  if (remaining > hh) {
    const hours = Math.floor(remaining / hh)
    res.push(`${hours}`.padStart(2, '0'))
    remaining -= (hours * hh)
  } else {
    res.push('00')
  }

  if (remaining > mm) {
    const minutes = Math.floor(remaining / mm)
    res.push(`${minutes}`.padStart(2, '0'))
    remaining -= (minutes * mm)
  } else {
    res.push('00')
  }

  if (remaining > 0) {
    res.push(`${remaining}`.padStart(2, '0'))
  } else {
    res.push('00')
  }

  if (long) {
    return `${res[0]} hr, ${res[1]} min, ${res[2]} sec`
  }

  return res.join(':')
}

export const formatDate = (timestamp, format = 'YYYY-MM-DD') => date.formatDate(timestamp, format)

export const extractDate = (obj, format = DateKeyFormat) => date.extractDate(obj, format)

export const isArrayEqual = (a = [], b = []) => {
  const x = a.sort()
  const y = b.sort()

  if (!x.length && !y.length) {
    return true
  }

  return x.length && y.length &&
    x.every((value, index) => (value === y[index]))
}

export const scrollTo = (element, duration = 300, offset = 100) => {
  let targetElement = element
  if (Array.isArray(element)) {
    targetElement = element[0]
  }

  if (typeof targetElement === 'string') {
    targetElement = targetElement.startsWith('#')
      ? document.getElementById(targetElement.slice(1))
      : document.getElementsByClassName(targetElement)[0]
  }

  if (!targetElement) {
    return
  }

  const target = getScrollTarget(targetElement)
  const effectiveOffset = targetElement.offsetTop - offset
  setScrollPosition(target, effectiveOffset, duration)
}

export const shortenNum = (value) => {
  if (value < 1000) {
    return value
  }
  return Number.parseFloat(value / 1000).toFixed(1) + 'K'
}

export default {
  toSeconds,
  inMinutes,
  inHours,
  elapsedTime,
  padZero,
  extractDate,
  formatDate,
  isArrayEqual,
  scrollTo,
  shortenNum
}
