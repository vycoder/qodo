const UNIT_HEIGHT = 20
const OFFSET_HEIGHT = 120
const DEFAULT_HEIGHT = 500

export default {
  mounted () {
    this.setHeight()
  },
  data () {
    return {
      chartHeight: 100 // non-zero seed
    }
  },
  watch: {
    series (a, b) {
      this.setHeight()
    }
  },
  methods: {
    /**
     * Sets chart height dynamically proportional to the number of categories.
     * Takes into account the legends area that also grows in height.
     */
    setHeight () {
      const baseHeight = this.chartOptions.xaxis.categories.length * UNIT_HEIGHT
      if (!baseHeight || !this.$refs.chart) {
        this.chartHeight = DEFAULT_HEIGHT
        return
      }
      const legendHeight = this.$refs.chart.$el.getElementsByClassName('apexcharts-legend')[0].clientHeight
      if (this.$q.platform.is.desktop) {
        this.chartHeight = DEFAULT_HEIGHT + legendHeight
        return
      }
      this.chartHeight = baseHeight + legendHeight + OFFSET_HEIGHT
    }
  }
}
