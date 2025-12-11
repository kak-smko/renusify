<template>
  <div :id="id" :class="classes">
    <div class="app-wrap" :style="{'min-height':$r.breakpoint.height+'px'}">
      <!--
       Main content slot for the application wrapper.
       @example
       <div class="color-one pa-12">
       <r-btn>test</r-btn>
       </div>
     -->
      <slot></slot>
    </div>
    <r-toast></r-toast>
  </div>
</template>

<script setup>
import {computed, inject} from 'vue'

const renusify = inject('renusify')

const props = defineProps({
  /**
   * The ID attribute for the root element
   */
  id: {
    type: [String, Number],
    default: 'renusify'
  },
  /**
   * Controls the text direction (Right-to-Left).
   * If undefined, uses the global RTL setting from Renusify.
   */
  rtl: {type: Boolean, default: undefined}
})

const classes = computed(() => ({
  [renusify.$r.prefix + 'app']: true,
  'app-rtl': props.rtl ?? renusify.$r.rtl,
  'app-ltr': !(props.rtl ?? renusify.$r.rtl)
}))
</script>

<style lang="scss">
@use "../../style" as *;
@use "../../style/base";
@use "../../style/app";
@use '../../style/colors';
@use '../../style/transitions';

.#{$prefix}app {
  display: flex;

  background: var(--color-sheet);
  color: var(--color-on-sheet);


  &.app-rtl {
    direction: rtl;
    text-align: right;
  }

  &.app-ltr {
    direction: ltr;
    text-align: left;
  }

  .app-wrap {
    max-width: 100%;
    width: 100%;
  }

}

// Firefox overrides
@include firefox() {
  @media print {
    .#{$prefix}app {
      display: block;

      &-wrap {
        display: block
      }
    }
  }
}
</style>
