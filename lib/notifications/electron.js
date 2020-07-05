export const create = (title, { message, icon, handler = () => {} }) => {
  if (Notification.permission === 'granted') {
    const notif = new Notification(title, { body: message, icon })
    notif.onclick = handler
    return notif
  }

  if (Notification.permission !== 'denied') {
    return new Promise((resolve, reject) => {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          const n = new Notification(title, { body: message, icon })
          n.onclick = handler
          return n
        }
        return reject(permission)
      })
    })
  }
}
