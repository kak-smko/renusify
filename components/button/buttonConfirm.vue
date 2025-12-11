<template>
  <r-btn v-bind="$attrs" @click.prevent.stop="show=true">
    <!-- Default slot for button content
     @example Click Me-->
    <slot></slot>
  </r-btn>
  <r-confirm
      :hard="hard"
      :title="title"
      :text="body"
      :cancelText="cancelText"
      :confirmText="confirmText"
      v-model="show"
      v-on:accept="accept"
      v-on:cancel="show = false"
  />
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  /**
   * Makes the dialog persistent (cannot be closed by clicking outside)
   * @type {Boolean}
   */
  hard: Boolean,

  /**
   * Title text displayed in the dialog header
   * @type {String}
   */
  title: String,

  /**
   * Body text displayed in the dialog content area
   * @type {String}
   */
  body: String,

  /**
   * Text for the cancel button
   * @type {String}
   */
  cancelText: String,

  /**
   * Text for the confirm/accept button
   * @type {String}
   */
  confirmText: String,
})

const emit = defineEmits([
  /**
   * Emitted when the confirm button is clicked
   * @param {Boolean} confirmed - Always true indicating confirmation
   */
  'click'
])

const show = ref(false)

/**
 * Handles confirmation action
 */
const accept = () => {
  emit('click', true)
  show.value = false
}
</script>
