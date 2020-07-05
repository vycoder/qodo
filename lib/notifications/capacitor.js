import { Notify } from 'quasar'

export const create = async (title, { message, icon, handler }) => {
  return Notify.create({
    icon,
    color: 'primary',
    message: title,
    caption: message,
    position: 'top-right',
    actions: [{ label: 'Start', color: 'white', handler }]
  })
}
