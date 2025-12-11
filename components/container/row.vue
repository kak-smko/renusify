<template>
  <section :class="{'row-dense':dense,'no-gutters':noGutters,'row-grid':grid}" class="row">
    <!-- Default slot for row content
     @example
     <r-col class="col-4"> col-1</r-col>
     <r-col class="col-4"> col-2</r-col>
     <r-col class="col-4"> col-3</r-col>
     -->
    <slot></slot>
  </section>
</template>

<script setup>
defineProps({
  /**
   * Reduces spacing between grid items
   * @type {Boolean}
   */
  dense: Boolean,

  /**
   * Enables grid layout mode
   * @type {Boolean}
   */
  grid: Boolean,

  /**
   * Removes gutters (padding) between grid items
   * @type {Boolean}
   */
  noGutters: Boolean
})
</script>
