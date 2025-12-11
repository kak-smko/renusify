<template>
    <span ref="icon" :class="classes">
      <!-- Default slot for icon content. -->
        <slot></slot>
    </span>
</template>

<script setup>
import {computed, inject, onMounted, ref} from 'vue'

/**
 * Component properties configuration
 * @typedef {Object} ComponentProps
 */

const props = defineProps({
  /**
   * Width of the component
   * @description CSS width value (e.g., '100px', '50%', 'auto')
   * @example '100%'
   * @example '300px'
   */
  width: {type: String},

  /**
   * Height of the component
   * @description CSS height value (e.g., '100px', '50%', 'auto')
   * @example '200px'
   * @memberof ComponentProps
   */
  height: {type: String},

  /**
   * Whether the icon is disabled
   * @description When true, user interaction is prevented and visual styling indicates disabled state
   */
  disabled: Boolean,

  /**
   * Whether to apply exact icon for both rtl and ltr
   */
  exact: Boolean
})

const $r = inject('renusify').$r

const icon = ref(null)

const classes = computed(() => {
  return {
    [`${$r.prefix}icon`]: true,
    'icon-disabled': props.disabled,
    'exact-icon': props.exact
  }
})

onMounted(() => {
  if (props.width || props.height) {
    const el = icon.value?.firstElementChild
    if (el) {
      if (props.width) {
        el.setAttribute('width', props.width)
      }
      if (props.height) {
        el.setAttribute('height', props.height)
      }
    }
  }
})
</script>
<style lang="scss">
@use "../../style" as *;

.#{$prefix}icon {
  display: inline-flex;
  vertical-align: -.5rem;

  &.icon-disabled {
    @include disable-states();
  }

  @include rtl() {
    &:not(.exact-icon) {
      transform: scale(-1, 1);
    }
  }
}
</style>