<template functional>
  <q-page>
    <q-layout
      container
      view="lHh Lpr lFf"
      style="height: 100vh">
      <q-drawer
        :value="true"
        show-if-above
        bordered
        no-swipe-open
        no-swipe-close
        no-swipe-backdrop
        behavior="desktop"
        content-class="bg-grey-2">
        <q-layout container>
          <q-header
            class="bg-grey-1 q-px-sm q-pl-md q-py-xs text-primary shadow-light">
            <q-toolbar>
              <q-toolbar-title class="text-bold">
                {{props.title}}
              </q-toolbar-title>
            </q-toolbar>
            <div class="sleeve" />
          </q-header>
          <q-page-container>
            <q-page class="q-pb-md">
              <slot name="side" />
            </q-page>
          </q-page-container>
          <q-footer
            class="bg-grey-3"
            bordered>
            <slot name="side-bottom-actions">
              <div class="q-pa-md" />
            </slot>
          </q-footer>
        </q-layout>
      </q-drawer>
      <q-page-container>
        <slot />
      </q-page-container>
    </q-layout>
  </q-page>
</template>
<style lang="scss" scoped>
.sleeve {
  &::before, &::after {
    box-shadow: 0 -25px 0 0 $grey-1;
  }
}

/deep/ .q-layout-container {
  div.absolute-full {
    right: 0px !important;
    .scroll {
      left: 0px;
      right: 0px !important;
      scrollbar-width: thin !important;
      width: 100% !important;
      &::-webkit-scrollbar {
        background-color: white;
        width: 5px !important;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: linear-gradient(to left, $cyan-3, $accent);
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: rgba(0,0,0,0.1);
        border: 1px solid #ccc;
      }
    }
  }
}

</style>
