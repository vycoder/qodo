import { Platform, LocalStorage } from 'quasar'
import { initializeDb } from 'api/database'
import Pomodoro from 'lib/pomodoro'
import Preferences from 'lib/preferences'

import { PremiumFlagKey } from 'lib/boot/utils'

import { productName, version } from 'app/package.json'

require('lib/boot')

import CommonDialogs from 'lib/dialogs'

import {
  inMinutes,
  inHours,
  padZero,
  elapsedTime,
  formatDate,
  shortenNum
} from 'lib/utils'

const initializeFilters = (Vue) => {
  Vue.filter('inMinutes', inMinutes)
  Vue.filter('inHours', inHours)
  Vue.filter('elapsedTime', elapsedTime)
  Vue.filter('padZero', padZero)
  Vue.filter('formatDate', formatDate)
  Vue.filter('shortenNum', shortenNum)
}

const iap = {
  store: window.store,
  productId: process.env.IAP_PRODUCT_ID,
  product: {}
}

if (Platform.is.capacitor) {
  iap.store.when(iap.productId).updated(p => (iap.product = p))
}

export default async ({ Vue, store }) => {
  initializeFilters(Vue)
  await initializeDb()

  const preferences = new Preferences(store)
  const pomodoro = new Pomodoro(store, preferences)

  if (Platform.is.electron) {
    Vue.component('QSplitLayout', () => import('layouts/desktop/SplitLayout'))
  }

  Vue.prototype.$o = {
    pomodoro,
    preferences,
    tearDown () {
      pomodoro.tearDown()
    },
    dialog: CommonDialogs,
    app: {
      name: productName,
      version,
      isPremium: () => {
        return LocalStorage
          .getItem(PremiumFlagKey)
          .current === true
      }
    },
    iap
  }
}
