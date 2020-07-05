<template>
  <opus-dialog
    ref="dialog"
    @hide="onDialogHide"
    :title="`${$o.app.name} Premium`">
    <template v-slot:actions>
      <q-btn
        v-if="!product"
        color="accent"
        class="q-px-xl"
        loading no-caps rounded>
        <template v-slot:loading>
          <q-spinner-dots />
        </template>
      </q-btn>
      <q-btn
        v-else-if="product.owned"
        @click="hide()"
        no-caps rounded
        color="accent"
        class="q-px-lg q-py-sm"
        label="Start Using Premium!" />
      <q-btn
        v-else-if="!product.canPurchase"
        color="accent"
        class="q-px-xl"
        loading no-caps rounded>
        <template v-slot:loading>
          <q-spinner-dots />
        </template>
      </q-btn>
      <q-btn
        v-else
        @click="getPremium"
        no-caps rounded
        color="accent"
        class="q-px-lg q-py-sm"
        :label="`Premium: ${product.price} / yr`" />
    </template>
    <div class="column q-gutter-y-sm q-pa-sm shadow-light">
      <q-card
        v-for="feature in premiumFeatures"
        :key="feature.title"
        :class="feature.color"
        class="text-white">
        <q-card-section class="q-pb-sm">
          <div class="text-h6">{{feature.title}}</div>
        </q-card-section>
        <q-card-section>{{feature.description}}</q-card-section>
      </q-card>
    </div>
  </opus-dialog>
</template>
<script>
import OpusDialog from '../OpusDialog'
import UseOpusDialog from 'lib/commons/opus-dialog-functions'

export default {
  name: 'PremiumGuardDialog',
  mixins: [UseOpusDialog],
  components: { OpusDialog },
  created () {
    this.product = this.$o.iap.product
  },
  data () {
    return {
      product: null,
      features: [
        {
          title: 'Sprint Duration Options',
          description: 'Unlock more time intervals between your work and break sprints.',
          color: 'night-fade'
        },
        {
          title: 'Custom Reports',
          description: 'Unlock more reports selections.',
          color: 'true-sunset'
        },
        {
          title: 'Export Data',
          description: 'Export your data in CSV, PNG or SVG. Use it as you see fit.',
          color: 'morpheus-den'
        },
        {
          title: 'Premium Future Features',
          description: 'This app is in constant development. We\'ll be rolling out premium features such as, Dark Mode, Color Themes, and more.',
          color: 'night-party'
        }
      ]
    }
  },
  computed: {
    premiumFeatures () {
      return [
        {
          title: 'No Advertisement',
          description: 'Unlock the advertisement-free version of the app',
          color: 'passionate-bed'
        },
        ...this.features
      ]
    },
    getPremiumBtnLabel () {
      if (this.$q.platform.is.electron) {
        return 'Get Premium'
      }
      return 'Buy Premium for'
    }
  },
  methods: {
    async getPremium () {
      if (this.$q.platform.is.electron) {
        return // redirect
      }
      this.$o.iap.store.order(this.$o.iap.productId)
    }
  }
}
</script>
<style lang="scss" scoped>
.night-fade {
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}
.true-sunset {
  background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
}
.morpheus-den {
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
}
.passionate-bed {
  background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
}
.night-party {
  background-image: linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
}
</style>
