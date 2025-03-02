<template>
  <div :class="classes">
    <header>
      <r-container class="pa-0">
        <div class="toolbar-content">
          <menu-laptop :menu="menu"></menu-laptop>
          <r-spacer></r-spacer>
          <div v-if="search" class="mt-n5">
            <r-search-box autofocus closable :label="searchLabel" :url="search">
              <template v-slot="{item}">
                <slot name="search" :item="item"></slot>
              </template>
            </r-search-box>
          </div>
          <slot name="logo">
            <div v-if="logo">
              <r-img :src="logo" alt="logo" :width="logoW" :height="logoH"></r-img>
            </div>
          </slot>
        </div>
      </r-container>
    </header>
  </div>
</template>
<script>
import {defineAsyncComponent} from 'vue'
import {toolbar} from './mixin.js'

export default {
  components: {MenuLaptop: defineAsyncComponent(() => import('./menuLaptop.vue'))},
  mixins: [toolbar]
}
</script>
