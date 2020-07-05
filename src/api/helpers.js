import { DateKeyFormat } from 'lib/constants'
import { date } from 'quasar'
const { formatDate } = date

export const toJSON = doc => doc.toJSON()
export const asDateKey = timestamp => parseInt(formatDate(timestamp, DateKeyFormat), 10)
