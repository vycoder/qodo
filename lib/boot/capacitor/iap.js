import { LocalStorage } from 'quasar'
import Admob from './admob'

const initIAPStore = (PremiumFlagKey) => {
  if (process.env.DEV) {
    return
  }

  const productId = process.env.IAP_PRODUCT_ID
  const IAPStore = window.store

  if (process.env.IAP_DEBUG) {
    IAPStore.verbosity = IAPStore.DEBUG
    IAPStore.error((e) => {
      console.error(`--> ${e.code} : ${e.message}`)
    })

    IAPStore.when(productId).updated((p) => {
      console.log('--> debug updated', JSON.stringify(p))
    })
  }

  IAPStore.register([{
    id: productId,
    type: IAPStore.PAID_SUBSCRIPTION
  }])

  IAPStore.validator = process.env.IAP_VALIDATOR

  IAPStore.when(productId).approved(p => (p.verify()))
  IAPStore.when(productId).verified(p => {
    const cacheStatus = LocalStorage.getItem(PremiumFlagKey)
    LocalStorage.set(PremiumFlagKey, { prev: cacheStatus.prev, current: true })
    Admob.removeBanner()
    p.finish()
  })

  IAPStore
    .when(productId)
    .updated(product => {
      if (product.state !== IAPStore.VALID) {
        return
      }

      if (!product.owned) {
        const cacheStatus = LocalStorage.getItem(PremiumFlagKey)
        LocalStorage.set(PremiumFlagKey, { prev: cacheStatus.current, current: false })
        Admob.initialize(() => (Admob.showBanner()))
      }
    })

  IAPStore.when(productId)
    .cancelled((p) => {
      const cacheStatus = LocalStorage.getItem(PremiumFlagKey)
      LocalStorage.set(PremiumFlagKey, { prev: cacheStatus.current, current: false })
      Admob.showBanner()
    })
  IAPStore.when(productId)
    .refunded((p) => {
      const cacheStatus = LocalStorage.getItem(PremiumFlagKey)
      LocalStorage.set(PremiumFlagKey, { prev: cacheStatus.current, current: false })
      Admob.showBanner()
    })
  IAPStore.when(productId)
    .expired((p) => {
      const cacheStatus = LocalStorage.getItem(PremiumFlagKey)
      LocalStorage.set(PremiumFlagKey, { prev: cacheStatus.current, current: false })
      Admob.showBanner()
    })

  IAPStore.refresh()
}

export default {
  initialize: initIAPStore,
  store: window.store
}
