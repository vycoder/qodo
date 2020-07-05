import { LocalStorage } from 'quasar'
import { Plugins, StatusBarStyle } from '@capacitor/core'
import { PremiumFlagKey } from '../utils'

import InAppPurchase from './iap'

const {
  CapacitorKeepScreenOn,
  StatusBar,
  Network
} = Plugins

CapacitorKeepScreenOn.enable()

StatusBar.setStyle({ style: StatusBarStyle.Light })
StatusBar.setBackgroundColor({ color: 'white' })
StatusBar.hide()

if (!LocalStorage.has(PremiumFlagKey)) {
  LocalStorage.set(PremiumFlagKey, {
    prev: false,
    current: false
  })
}

Network
  .getStatus()
  .then(({ connected }) => {
    if (connected) {
      InAppPurchase.initialize(PremiumFlagKey)
    }
  })
