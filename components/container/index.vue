<template>
  <div :class="classes">
    <!-- Default slot for container content
     @example
     <r-row>
      <r-col class="col-4"> col-1</r-col>
      <r-col class="col-4"> col-2</r-col>
      <r-col class="col-4"> col-3</r-col>
     </r-row>
      -->
    <slot></slot>
  </div>
</template>

<script setup>
import {computed, inject} from 'vue'
import './style.scss'

const props = defineProps({
  /**
   * Makes container full width (fluid)
   * @type {Boolean}
   */
  fullWidth: Boolean,

  /**
   * Makes container fill available height
   * @type {Boolean}
   */
  fill: Boolean
})

const {$r} = inject('renusify')

const classes = computed(() => {
  const prefix = $r.prefix || 'r-'
  return {
    'container-fluid': props.fullWidth,
    'fill': props.fill,
    [`${prefix}container`]: true
  }
})
</script>