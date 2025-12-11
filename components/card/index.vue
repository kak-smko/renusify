<template>
  <component v-bind="att"
             :is="isClickable?route.tag:'div'"
             v-ripple="isClickable&&isRipple">
    <!-- Default slot for card content
    @example
    <div class=pa-5>
      <div class="title-1 color-one">title</div>
      <div class="mt-5">body description</div>
    </div>
    -->
    <slot></slot>
  </component>
</template>

<script setup>
import {computed, inject, useAttrs} from 'vue'
import {useRootable} from '../../tools/root.js'

const $r = inject('renusify').$r;

const props = defineProps({
  /**
   * Removes elevation and background color
   * @type {Boolean}
   */
  flat: Boolean,

  /**
   * Applies outlined border style
   * @type {Boolean}
   */
  outlined: Boolean,

  /**
   * Enables ripple effect on click
   * @type {Boolean}
   * @default true
   */
  isRipple: {
    type: Boolean,
    default: true
  },

  /**
   * Custom class for active state
   * @type {String}
   */
  activeClass: String,

  /**
   * Disables the card
   * @type {Boolean}
   */
  disabled: Boolean,

  /**
   * Custom class for exact active state
   * @type {String}
   */
  exactActiveClass: String,

  /**
   * Applies link styling
   * @type {Boolean}
   */
  link: Boolean,

  /**
   * URL for link card
   * @type {String|Object}
   */
  href: [String, Object],

  /**
   * Route location for vue-router
   * @type {String|Object}
   */
  to: [String, Object],

  /**
   * HTML tag to use for card element
   * @type {String}
   */
  tag: String,

  /**
   * Target attribute for links
   * @type {String}
   */
  target: String
})

const {route, isClickable} = useRootable(props, useAttrs())

const att = computed(() => {
  let res = {
    'class': [$r.prefix + 'card', {
      'card-sheet': !props.flat && !props.outlined,
      'card-outlined': props.outlined
    }]
  }

  if (props.href) {
    res['href'] = route.value.data.attrs.href
  }

  if (props.target) {
    res['rel'] = 'noreferrer'
    res['target'] = route.value.data.attrs.target
  }

  if (props.to) {
    res['to'] = route.value.data.props.to
  }

  return res
})
</script>
<style lang="scss">
@use "sass:map";
@use "../../style" as *;


.#{$prefix}card {
  display: block;
  position: relative;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  transition: $primary-transition;
  transition-property: box-shadow, opacity;
  border-radius: map.get($borders, 'sm');

  &.card-sheet {
    background-color: var(--color-sheet-container);
    border: 1px solid var(--color-sheet-container-low);
    color: var(--color-on-sheet);
  }

  &.card-outlined {
    border: 1px solid var(--color-border-low);
  }

  @include states();
}
</style>
