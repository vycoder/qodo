<template>
  <apex-chart
    type="donut"
    :series="series"
    :options="chartOptions"
    :height="chartOptions.chart.height"
  />
</template>
<script>
import ApexChart from 'vue-apexcharts'

export default {
  name: 'PieChart',
  components: { ApexChart },
  props: {
    series: { type: Array, required: true },
    labels: { type: Array, required: true },
    tooltip: { type: Function, default: val => val }
  },
  created () {
    this.chartOptions.labels = this.labels
    this.chartOptions.tooltip.y.formatter = this.tooltip
  },
  data () {
    return {
      chartOptions: {
        labels: [],
        title: {
          text: 'Projects',
          floating: true,
          margin: 50,
          style: {
            fontSize: '2rem'
          }
        },
        theme: { palette: 'palette5' },
        chart: {
          type: 'donut',
          height: 500,
          toolbar: { show: false }
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: undefined
          }
        },
        legend: {
          fontSize: '20px'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              height: 320
            },
            legend: {
              position: 'bottom',
              fontSize: 'auto'
            },
            title: {
              margin: 20,
              align: 'center',
              floating: false,
              style: { fontSize: '1rem' }
            }
          }
        }]
      }
    }
  }
}
</script>
