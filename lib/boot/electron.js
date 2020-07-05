import { LocalStorage } from 'quasar'

import { PremiumFlagKey } from './utils'

if (!LocalStorage.has(PremiumFlagKey)) {
  LocalStorage.set(PremiumFlagKey, {
    prev: false,
    current: false
  })
}

const { ELECTRON_PREMIUM_FLAG } = process.env
if (ELECTRON_PREMIUM_FLAG === 'true') {
  LocalStorage.set(PremiumFlagKey, {
    prev: true, current: true
  })
} else {
  LocalStorage.set(PremiumFlagKey, {
    prev: false, current: false
  })
}
