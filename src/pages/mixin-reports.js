import { ReportOptions } from 'lib/constants'
import UsePremiumGuard from 'lib/commons/premium-guard/premium-guard-mixin'

export default {
  mixins: [UsePremiumGuard],
  data () {
    return {
      model: 'today',
      options: ReportOptions.map((option) => ({ value: option.name, ...option }))
    }
  }
}
