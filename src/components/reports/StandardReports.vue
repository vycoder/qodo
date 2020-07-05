<template>
  <section v-if="!loading" class="q-mt-lg">
    <template v-if="reports.length">
      <component
        :is="chartComponent"
        :data="reports"
        :key="value"
        ref="chart" />
      <div class="q-mt-xl q-pt-xl desktop-only" />
      <project-donut
        :data="reports" />
    </template>
    <opus-img-caption
      v-else
      caption="No Data"
      class="absolute-center"
      src="financial_data.svg"
      :width="emptyImgPlaceholderWidth"
      style="z-index:2001; margin-top: 4rem" />
  </section>
</template>
<script>
import UseEventHandlers from './mixin-event-handlers'
import ReportAPI from 'api/reports'

import { date } from 'quasar'

const { subtractFromDate } = date

import OpusImgCaption from 'lib/commons/OpusImgCaption'

import ProjectDonut from 'components/reports/ProjectDonut'

export default {
  name: 'StandardReports',
  components: {
    OpusImgCaption,
    ProjectDonut
  },
  mixins: [UseEventHandlers],
  props: {
    value: { type: String, required: true }
  },
  data () {
    return {
      reports: [],
      loading: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value, oldValue) {
        if (value !== oldValue) {
          this.render(value)
        }
      }
    }
  },
  computed: {
    isLinear () {
      return this.value === 'today' || this.value === 'yesterday'
    },
    emptyImgPlaceholderWidth () {
      return this.$q.platform.is.mobile ? '250px' : '50vw'
    },
    chartComponent () {
      if (this.isLinear) {
        return () => import('components/reports/TasksByDayChart')
      }
      return () => import('components/reports/TasksByNDaysChart')
    }
  },
  methods: {
    async render (value) {
      try {
        this.loading = true
        switch (value) {
          case 'today': {
            this.reports = await ReportAPI.findDates({ from: Date.now() })
            break
          }
          case 'yesterday': {
            const from = subtractFromDate(Date.now(), { days: 1 })
            this.reports = await ReportAPI.findDates({ from, to: from })
            break
          }
          case 'seven': {
            const from = subtractFromDate(Date.now(), { days: 7 })
            this.reports = await ReportAPI.findDates({ from })
            break
          }
          case 'fourteen': {
            const from = subtractFromDate(Date.now(), { days: 14 })
            this.reports = await ReportAPI.findDates({ from })
            break
          }
          default:
            this.reports = []
            break
        }
      } finally {
        this.loading = false
      }
    },
    updateRecords () {
      this.render(this.value)
    }
  }
}
</script>
