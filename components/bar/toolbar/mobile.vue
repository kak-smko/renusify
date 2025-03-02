<template>
  <div :class="classes">
    <header>
      <r-container class="pa-0">
        <div class="toolbar-content">
          <r-btn icon text @click.prevent="open=!open">
            <r-icon v-html="$r.icons.menu"></r-icon>
          </r-btn>
          <r-spacer></r-spacer>
          <div v-if="search" class="mt-n5">
            <r-search-box closable autofocus
                          :label="searchLabel" :url="search">
              <template v-slot="{item}">
                <slot name="search" :item="item"></slot>
              </template>
            </r-search-box>
          </div>
          <slot name="logo"></slot>
        </div>
      </r-container>
    </header>
    <menu-mobile :menu="menu" v-model="open" :logo="logo"
                 :logoW="logoW" :logoH="logoH"></menu-mobile>
  </div>
</template>
<script>
import {defineAsyncComponent} from 'vue'
import {toolbar} from './mixin.js'

export default {
  components: {MenuMobile: defineAsyncComponent(() => import('./menuMob.vue'))},
  mixins: [toolbar]
}
</script>
