<template>
  <hr :class="classes"/>
</template>

<script setup>
import {computed, inject} from 'vue'

const props = defineProps({
  /**
   * Adds inset padding to the divider
   * @type {Boolean}
   */
  inset: Boolean,

  /**
   * Makes the divider vertical instead of horizontal
   * @type {Boolean}
   */
  vertical: Boolean
})

const $r = inject('renusify').$r

const classes = computed(() => {
  let c = [$r.prefix + 'divider']
  if (props.inset) {
    c.push('divider-inset')
  }
  if (props.vertical) {
    c.push('divider-vertical')
  }
  return c
})
</script>
