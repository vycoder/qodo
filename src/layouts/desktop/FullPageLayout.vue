<template functional>
  <q-page>
    <q-layout
      container
      class="window-height">
      <q-header
        class="bg-grey-1 q-px-sm q-pl-md q-py-xs text-primary shadow-light">
        <slot name="toolbar">
          <q-toolbar>
            <q-toolbar-title class="text-bold">
              {{props.title}}
            </q-toolbar-title>
          </q-toolbar>
        </slot>
        <div class="sleeve" />
      </q-header>
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
