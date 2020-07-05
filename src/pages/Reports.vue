<template>
  <q-page padding>
    <q-list>
      <q-item-label
        header
        class="q-py-none">
        <q-select
          :value="model"
          :options="options" map-options class="text-h6"
          @input="option => premiumGuardUpdate(option, this, 'model')"
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
      </q-item-label>
    </q-list>
    <component :is="chartComponent" :value="model" />
  </q-page>
</template>

<script>
import UseReports from 'pages/mixin-reports'

export default {
  name: 'ReportsPage',
  mixins: [UseReports],
  computed: {
    chartComponent () {
      if (this.model === 'custom') {
        return () => import('components/reports/CustomReports')
      }
      return () => import('components/reports/StandardReports')
    }
  }
}
</script>
