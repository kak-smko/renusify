<template>
  <div :class="`${$r.prefix}rating`">
    <r-btn :key="i"
           :class="`${Math.round(modelValue)>=i?'color-rating':''}`"
           :readonly="readonly"
           @click.prevent="select(i)"
           :size="size"
           icon
           text
           v-for="i in count">
      <r-icon v-html="$r.icons.star"></r-icon>
    </r-btn>
  </div>
</template>

<script setup>

const props = defineProps({
  /**
   * Total number of rating stars to display
   * @type {Number}
   * @default 5
   */
  count: {
    type: Number,
    default: 5
  },
  /**
   * Size of the rating stars
   * @type {String}
   * @default 'md'
   * @validator ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
   */
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(value)
  },
  /**
   * Current rating value (0 to count)
   * @type {Number}
   */
  modelValue: Number,
  /**
   * Disable rating interaction
   * @type {Boolean}
   */
  readonly: Boolean
})

const emit = defineEmits([
  /**
   * Emitted when a rating is selected
   * @param {Number} rating - The selected rating value (1 to count)
   */
  'update:modelValue'
])

// Methods
/**
 * Selects a rating value
 * @param {Number} rating - The rating value to select
 */
const select = (rating) => {
  if (props.readonly) return
  emit('update:modelValue', rating)
}
</script>

<style lang="scss">
@use "../../../style" as *;


.#{$prefix}rating {
  max-width: 100%;
  white-space: nowrap;
  transition: all $primary-transition;

  .color-rating * {
    color: #fbc02d !important;
  }
}

</style>
