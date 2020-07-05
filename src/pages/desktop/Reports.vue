<template>
  <full-page-layout :title="$route.name">
    <q-page padding class="bg-grey-1 overflow-hidden">
      <div class="row items-end text-secondary q-gutter-x-md q-px-xl q-pt-lg">
        <q-select
          :value="model"
          @input="option => premiumGuardUpdate(option, this, 'model')"
          :options="options" map-options
          color="secondary" class="text-h2 col text-primary"
          :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'">
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
              </q-item-section>
              <q-item-section v-if="scope.opt.premium && !$o.app.isPremium()" side>
                <q-badge color="amber" label="Premium" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-space />
        <div class="text-h1 text-weight-light">{{ currentDate | formatDate('D') }}</div>
        <div class="column">
          <div class="text-h2 text-weight-bold text-uppercase">{{ currentDate | formatDate('MMMM') }}</div>
          <div class="text-h4">{{ currentDate | formatDate('dddd')}}</div>
        </div>
      </div>
      <div class="q-pa-lg q-px-xl q-mt-lg">
        <component :is="chartComponent" :value="model" />
      </div>
    </q-page>
  </full-page-layout>
</template>
<script>
import UseReports from 'pages/mixin-reports'

import FullPageLayout from 'layouts/desktop/FullPageLayout'

export default {
  name: 'Reports',
  components: {
    FullPageLayout
  },
  mixins: [UseReports],
  computed: {
    currentDate () {
      return Date.now()
    },
    chartComponent () {
      if (this.model === 'custom') {
        return () => import('components/reports/CustomReports')
      }
      return () => import('components/reports/StandardReports')
    }
  }
}
</script>
