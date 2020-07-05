<template>
  <q-card
    flat square
    class="bg-none">
    <q-card-section v-if="data.length">
      <apex-chart
        type="bar"
        ref="chart"
        :series="series"
        :height="chartHeight"
        :options="chartOptions"
        style="margin-left: -1.5rem" />
    </q-card-section>
  </q-card>
</template>
<script>
import Utils from 'lib/utils'

import ApexChart from 'vue-apexcharts'

import { mapGetters } from 'vuex'

export default {
  name: 'TasksByDayChart',
  components: { ApexChart },
  props: {
    data: { type: Array, required: true }
  },
  async created () {
    if (!this.data.length) {
      return
    }
    const records = this.data.reduce((obj, { task, progress }) => {
      if (!obj[task]) {
        obj[task] = {
          task,
          progress,
          label: this.taskById(task).name
        }
        return obj
      }
      obj[task].progress += progress
      return obj
    }, {})

    const series = Object.keys(records).map(taskId => records[taskId].progress)
    const xLabels = Object.keys(records).map(taskId => records[taskId].label)
    const totalProgress = Object.keys(records)
      .map(taskId => records[taskId].progress)
      .reduce((a, b) => a + b)

    this.series = [{ data: series }]
    const subtitle = Utils.formatDate(Utils.extractDate(this.data[0].datekey.toString()), 'DD MMMM YYYY')

    this.chartOptions.xaxis.categories = xLabels
    this.chartOptions.title.text = Utils.elapsedTime(totalProgress, true)
    this.chartOptions.subtitle.text = subtitle
  },
  data () {
    return {
      series: [],
      chartOptions: {
        responsive: [{
          breakpoint: 480,
          options: {
            title: {
              align: 'center',
              floating: true,
              offsetY: 10,
              margin: 15,
              style: {
                fontSize: '1rem'
              }
            },
            subtitle: {
              align: 'center',
              floating: false,
              margin: 0,
              offsetY: 24,
              style: { fontSize: '12px' }
            },
            dataLabels: {
              formatter: (val, opt) => `${opt.w.globals.labels[opt.dataPointIndex]} : ${Utils.inMinutes(val)}min`
            },
            legend: { show: false },
            plotOptions: {
              bar: { horizontal: true }
            },
            xaxis: {
              labels: {
                show: true,
                formatter: val => Math.round(((val / 60) + Number.EPSILON) * 100) / 100
              }
            },
            yaxis: {
              labels: { show: false }
            }
          }
        }],
        chart: {
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        legend: {
          fontSize: '18px',
          itemMargin: {
            vertical: 1
          }
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'bottom'
            }
          }
        },
        theme: { palette: 'palette3' },
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: val => `${Utils.inMinutes(val)}min`,
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        yaxis: {
          labels: {
            formatter: function (val, opt) {
              return Math.round(((val / 60) + Number.EPSILON) * 100) / 100
            }
          }
        },
        xaxis: {
          labels: {
            show: false
          }
        },
        title: {
          text: '',
          align: 'left',
          floating: true,
          margin: 50,
          style: {
            fontSize: '2rem'
          }
        },
        subtitle: {
          style: { fontSize: 0 }
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            },
            formatter: val => Utils.elapsedTime(val)
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('tasks', ['taskById']),
    chartHeight () {
      if (this.$q.platform.is.desktop) {
        return 550
      }
      let baseHeightUnit = 20
      if (this.series.length && this.series[0].data.length) {
        baseHeightUnit *= this.series[0].data.length
      }
      return baseHeightUnit + 120
    }
  }
}
</script>
