<template>
  <main :class="{
            [$r.prefix+'content']:true,
            'flipped':flipped,
            'moved':moved,
            'below-header':belowHeader
        }"
        :style="{'--belowHeader':belowHeader}">
    <!-- Default slot for main content
    @example
    <r-container>
       <r-row>
         <r-col class="col-4"> col-1</r-col>
         <r-col class="col-4"> col-2</r-col>
         <r-col class="col-4"> col-3</r-col>
       </r-row>
    </r-container>
    -->
    <slot></slot>
  </main>
</template>

<script setup>
defineProps({
  /**
   * Adds content below the header
   * @type {String}
   */
  belowHeader: String,

  /**
   * Flips the component orientation
   * @type {Boolean}
   */
  flipped: Boolean,

  /**
   * Moves the component position
   * @type {Boolean}
   */
  moved: Boolean
})
</script>

<style lang="scss">
@use "sass:map";
@use "../../style" as *;


.#{$prefix}content {
  --belowHeader: 80px;
  width: 100%;
  max-width: 100%;
  transition: 0.2s map.get($transition, 'fast-out-slow-in');
  position: relative;

  &.flipped {
    @include rtl() {
      padding-right: 300px;
    }
    @include ltr() {
      padding-left: 300px;
    }
  }

  &.moved {
    width: calc(100% + 300px);
    @include rtl() {
      margin-right: 300px;
    }
    @include ltr() {
      margin-left: 300px;
    }
  }

  &.below-header {
    margin-top: var(--belowHeader);
  }

}
</style>
