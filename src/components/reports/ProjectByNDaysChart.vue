<template>
  <q-card flat square class="bg-none">
    <q-card-section v-if="data.length">
      <apex-chart
        type="bar"
        :series="series"
        :height="chartHeight"
        :options="chartOptions"
      />
    </q-card-section>
  </q-card>
</template>
<script>
import Utils from 'lib/utils'
import { mapGetters } from 'vuex'

import ApexChart from 'vue-apexcharts'

export default {
  name: 'ProjectByNDays',
  components: { ApexChart },
  props: {
    data: { type: Array, required: true }
  },
  created () {
    this.initialize()
  },
  data () {
    return {
      series: [],
      chartOptions: {
        responsive: [{
          breakpoint: 480,
          options: {
            plotOptions: { bar: { horizontal: true } },
            title: {
              style: { fontSize: '1rem' }
            },
            xaxis: {
              labels: {
                formatter: val => Math.round(((val / 60) + Number.EPSILON) * 100) / 100
              }
            },
            yaxis: {
              title: {
                text: undefined
              }
            }
          }
        }],
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: { show: false }
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        theme: { palette: 'palette3' },
        dataLabels: {
          formatter: val => `${Utils.inMinutes(val)}m`
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: '',
          style: {
            fontSize: '1.5rem'
          },
          margin: 15,
          offsetY: 10
        },
        subtitle: {
          text: '',
          floating: false,
          margin: 0,
          offsetY: 24
        },
        yaxis: {
          categories: [],
          labels: {
            formatter: val => Math.round(((val / 60) + Number.EPSILON) * 100) / 100
          }
        },
        xaxis: {
          title: {
            text: undefined
          }
        },
        tooltip: {
          y: {
            formatter: val => Utils.elapsedTime(val)
          }
        },
        fill: {
          opacity: 1
        }
      }
    }
  },
  computed: {
    ...mapGetters('projects', ['projectById']),
    chartHeight () {
      if (this.$q.platform.is.desktop) {
        return 500
      }
      const baseHeight = this.chartOptions.xaxis.categories.length * 20
      return baseHeight + 120
    }
  },
  methods: {
    initialize () {
      if (!this.data.length) {
        return
      }
      const dates = Array.from(new Set(this.data.map(r => r.datekey))).sort()
      const tasks = Array.from(new Set(this.data.map(r => r.project)))
      const series = tasks.map(project => ({
        name: this.projectById(project).name,
        data: dates.map(day =>
          this.data.filter(r => r.datekey === day && r.project === project)
            .map(r => r.progress)
            .reduce((a, b) => a + b, 0)
        )
      }))
      const totalProgress = this.data.map(r => r.progress).reduce((a, b) => a + b, 0)
      this.series = series
      this.chartOptions.xaxis.categories = dates.map(key => Utils.formatDate(Utils.extractDate(key.toString()), 'DD MMM'))
      this.chartOptions.title.text = Utils.elapsedTime(totalProgress, true)
      this.chartOptions.subtitle.text = this.buildCaption(dates)
    },
    buildCaption (dates) {
      const DateFormat = 'DD MMMM YYYY'
      const [first, ...rest] = dates
      if (!dates.length) {
        return ''
      }
      const from = Utils.formatDate(Utils.extractDate(first.toString()), DateFormat)
      if (dates.length === 1) {
        return `${from} - ${Utils.formatDate(Date.now(), DateFormat)}`
      }
      const [last] = rest.reverse()
      const to = Utils.formatDate(Utils.extractDate(last.toString()), DateFormat)
      return `${from} - ${to}`
    }
  }
}
</script>
