import { LocalStorage } from 'quasar'
import { Plugins } from '@capacitor/core'
const { AdMobAdvanced } = Plugins
import { AdSize, AdPosition } from 'capacitor-admob-advanced'

import { PremiumFlagKey } from 'lib/boot/utils'

export const paddingClass = document.createElement('style')
paddingClass.id = 'admobPadding'
paddingClass.type = 'text/css'
paddingClass.innerHTML = '.admob-padding { padding-top: 60px !important }' // 60px is the height of AdSize.FULL_BANNER

export const initializeAdMob = async (cb) => {
  AdMobAdvanced.addListener('onBannerAdLoaded', () => {
    if (!LocalStorage.getItem(PremiumFlagKey).current) {
      document
        .getElementsByTagName('head')[0]
        .appendChild(paddingClass)
    }
  })

  AdMobAdvanced.addListener('onBannerAdFailedToLoad', () => {
    document
      .getElementsByTagName('head')[0]
      .removeChild(document.getElementById(paddingClass.id))
  })

  return AdMobAdvanced.initialize({
    appIdAndroid: process.env.ADBMOB_ANDROID_ID,
    appIdIos: process.env.ADMOB_IOS_ID
  }).then(
    value => cb(value),
    error => console.error(error)
  )
}

export const showAdBanner = async () => {
  return AdMobAdvanced.showBanner({
    adIdAndroid: process.env.ADMOB_ANDROID_BANNER_ID,
    adIdIos: process.env.ADMOB_IOS_BANNER_ID,
    adSize: AdSize.FULL_BANNER,
    adPosition: AdPosition.TOP,
    isTesting: process.env.DEV
  })
}

export const removeAdBanner = () => {
  return AdMobAdvanced
    .removeBanner()
    .then(
      value => {
        document
          .getElementsByTagName('head')[0]
          .removeChild(document.getElementById(paddingClass.id))
      },
      error => { console.error(error) })
}

export default {
  initialize: initializeAdMob,
  showBanner: showAdBanner,
  removeBanner: removeAdBanner,
  admobPaddingClass: paddingClass
}
