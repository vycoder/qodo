export default {
  create: (title, { message, icon, handler }) => new Promise((resolve, reject) => {
    return import(`./${process.env.MODE}`)
      .then(({ create }) => resolve(create(title, { message, icon, handler })))
  })
}
