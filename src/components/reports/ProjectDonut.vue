<template>
  <q-card
    v-if="data.length"
    flat square
    class="bg-none">
    <q-card-section>
      <donut-chart
        :series="series"
        :labels="labels"
        :tooltip="tooltipFormatter"
      />
    </q-card-section>
  </q-card>
</template>
<script>
import Utils from 'lib/utils'
import { mapGetters } from 'vuex'

import DonutChart from 'components/reports/DonutChart'

export default {
  name: 'ProjectDonut',
  components: { DonutChart },
  props: {
    data: { type: Array, required: true }
  },
  created () {
    this.initialize()
  },
  data () {
    return {
      series: [],
      labels: []
    }
  },
  computed: { ...mapGetters('projects', ['projectById']) },
  methods: {
    initialize () {
      if (!this.data.length) {
        return
      }
      const records = this.data.reduce((obj, { progress, project }) => {
        if (!obj[project]) {
          obj[project] = {
            progress,
            label: (this.projectById(project) || { name: 'unset' }).name
          }
          return obj
        }
        obj[project].progress += progress
        return obj
      }, {})
      this.series = Object.keys(records).map(key => records[key].progress)
      this.labels = Object.keys(records).map(key => records[key].label)
    },
    tooltipFormatter (value) {
      return Utils.elapsedTime(value)
    }
  }
}
</script>
