import { openURL } from 'quasar'

import PremiumGuardDialog from './PremiumGuardDialog'

export default {
  methods: {
    premiumGuardUpdate (option, model, key) {
      if (typeof (option) !== 'object') {
        model[key] = option
        return
      }

      if (this.$o.app.isPremium() || !option.premium) {
        model[key] = option.value
        return
      }

      if (this.$q.platform.is.electron) {
        openURL(process.env.PREMIUM_REDIRECT_LINK)
        return
      }
      // Show 'Upgrade to Premium Dialog' on mobile.
      this.$q.dialog({
        component: PremiumGuardDialog,
        parent: this
      })
    }
  }
}
