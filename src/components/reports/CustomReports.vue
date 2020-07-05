<template>
  <section class="q-pb-md">
    <q-list class="q-mb-sm">
      <q-item-label header>
        <div class="row q-gutter-x-sm">
          <q-select
            v-model="categoryModel"
            :options="categoryOptions"
            dense filled square
            ref="categorySelect"
            @input="changeCategory"
            class="col-4 text-capitalize"
            popup-content-class="text-capitalize"
            :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"/>
            <template v-if="isSimpleSelect">
              <q-select
                v-model="model"
                ref="modelSelect"
                :label="modelLabel"
                :options="options"
                class="col ellipsis"
                dense filled square
                @input="fetchRecords"
                :disable="recordsLoading"
                :loading="recordsLoading"
                :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"/>
            </template>
            <template v-else>
              <div class="col row q-gutter-x-xs">
                <q-input
                  v-model="from"
                  mask="date"
                  label="From"
                  class="col"
                  :rules="['date']"
                  hide-bottom-space
                  ref="fromDateInput"
                  dense square filled readonly>
                  <template v-slot:append>
                    <q-popup-proxy
                      ref="qDateFromProxy"
                      :target="$refs.fromDateInput"
                      transition-show="scale"
                      transition-hide="scale">
                      <q-date
                        v-model="from"
                        @input="datesUpdated" />
                    </q-popup-proxy>
                  </template>
                </q-input>
                <q-input
                  v-model="to"
                  mask="date"
                  label="To"
                  class="col"
                  :rules="['date']"
                  ref="toDateInput"
                  hide-bottom-space
                  dense square filled readonly>
                  <template v-slot:append>
                    <q-popup-proxy
                      ref="qDateToProxy"
                      :target="$refs.toDateInput"
                      transition-show="scale"
                      transition-hide="scale">
                      <q-date
                        v-model="to"
                        @input="datesUpdated" />
                    </q-popup-proxy>
                  </template>
                </q-input>
              </div>
            </template>
        </div>
      </q-item-label>
    </q-list>
    <section v-if="!recordsLoading">
      <template v-if="records.length">
        <component
          :is="chartComponent"
          :data="records"
          ref="chart" />
        <template v-if="categoryModel === 'date'">
          <div class="q-mt-xl desktop-only" />
          <project-donut
            :data="records"
            ref="pieChart" />
        </template>
      </template>
      <opus-img-caption
        v-else
        src="pie_chart.svg"
        caption="No data..."
        class="absolute-center"
        :width="emptyImgPlaceholderWidth"
        style="z-index: 2001; margin-top: 5rem" />
    </section>
  </section>
</template>
<script>
import UseEventHandlers from './mixin-event-handlers'
import ReportsAPI from 'api/reports'

import { extractDate } from 'lib/utils'
import ProjectDonut from 'components/reports/ProjectDonut'

import OpusImgCaption from 'lib/commons/OpusImgCaption'

export default {
  name: 'CustomReports',
  mixins: [UseEventHandlers],
  components: {
    OpusImgCaption,
    ProjectDonut
  },
  created () {
    this.refreshModels()
  },
  data () {
    return {
      records: [],
      recordsLoading: false,
      categoryModel: 'task',
      taskOptions: [],
      projectOptions: [],
      model: null,
      from: null,
      to: null,
      dateInputFormat: 'YYYY/MM/DD',
      categoryOptions: ['task', 'project', 'date']
    }
  },
  computed: {
    chartComponent () {
      if (this.categoryModel === 'project') {
        return () => import('components/reports/ProjectByNDaysChart')
      }
      return () => import('components/reports/TasksByNDaysChart')
    },
    isSimpleSelect () {
      return this.categoryModel === 'task' || this.categoryModel === 'project'
    },
    modelLabel () {
      const labels = {
        task: 'Select task',
        project: 'Select project'
      }
      return labels[this.categoryModel]
    },
    options () {
      let options = []
      switch (this.categoryModel) {
        case 'task':
          options = this.$store
            .getters['tasks/allTasks']
            .map(task => ({
              value: task.id,
              label: task.name
            }))
          break
        case 'project':
          options = this.$store
            .getters['projects/allProjects']
            .map(project => ({
              value: project.id,
              label: project.name
            }))
          break
        default: break
      }
      return Object.freeze(options)
    },
    emptyImgPlaceholderWidth () {
      return this.$q.platform.is.mobile ? '250px' : '45vw'
    }
  },
  methods: {
    async changeCategory () {
      this.refreshModels()
      await this.$nextTick()
      this.$refs.categorySelect.blur()
      await this.$nextTick()
      if (this.isSimpleSelect) {
        this.$refs.modelSelect.showPopup()
      }
    },
    refreshModels () {
      this.model = null
      this.records = []
      this.from = null
      this.to = null
    },
    datesUpdated () {
      this.$refs.qDateFromProxy.hide()
      this.$refs.qDateToProxy.hide()
      if (this.from && this.to) {
        this.fetchRecords({ value: 'date' })
      }
    },
    async fetchRecords ({ value }) {
      this.records = []
      if (!value) {
        return
      }
      try {
        this.recordsLoading = true
        switch (this.categoryModel) {
          case 'task':
            this.records = await ReportsAPI.findTask(value)
            await this.$nextTick()
            break
          case 'project':
            this.records = await ReportsAPI.findProject(value)
            break
          case 'date': {
            const from = extractDate(this.from, this.dateInputFormat)
            const to = extractDate(this.to, this.dateInputFormat)
            this.records = await ReportsAPI.findDates({ from, to })
            break
          }
          default:
            break
        }
      } finally {
        this.recordsLoading = false
      }
    },
    updateRecords () {
      this.fetchRecords(this.model)
    }
  }
}
</script>
