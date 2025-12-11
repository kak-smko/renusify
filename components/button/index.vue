<template>
  <component
      :is="route.tag"
      v-ripple="!disabled && !loading"
      :aria-busy="loading"
      :aria-disabled="disabled || loading"
      :aria-label="ariaLabel"
      :class="buttonClasses"
      :disabled="disabled || loading"
      :type="type"
      v-bind="computedAttributes"
      @click="handleClick"
  >
    <span class="btn-content">
       <!-- Default slot for button content
        @example Click Me-->
      <slot/>

      <span
          v-if="label"
          :class="labelClass"
          class="label d-flex v-center h-center px-1 overflow-hidden"
      >
        <transition mode="out-in" name="counter-up">
          <span :key="label">{{ label }}</span>
        </transition>
      </span>
    </span>

    <span v-if="loading" class="btn-loader">
      <r-progress-circle
          :size="loaderSize"
          indeterminate
          width="2"
      />
    </span>
  </component>
</template>

<script setup>
import {computed, useAttrs, inject} from 'vue'
import {useRootable} from '../../tools/root.js'

// Props
const props = defineProps({
  /**
   * The HTML tag to use for the button
   * @values button, a, router-link, etc.
   */
  tag: {
    type: String,
    default: 'button'
  },

  /**
   * The type attribute for the button element
   * @values button, submit, reset
   */
  type: {
    type: String,
    default: 'button',
    validator: value => ['button', 'submit', 'reset'].includes(value)
  },

  /**
   * The size of the button
   * @values xs, sm, md, lg, xl,xxl
   */
  size: {
    type: String,
    default: 'md',
    validator: value => ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(value)
  },

  /**
   * Text or number to display as a label on the button
   */
  label: [String, Number],

  /**
   * Additional CSS classes for the label
   */
  labelClass: [String, Array, Object],

  /**
   * Makes the button expand to full width
   */
  block: Boolean,

  /**
   * Removes the button's elevation
   */
  depressed: Boolean,

  /**
   * Outlined button style
   */
  outlined: Boolean,

  /**
   * Rounded button style
   */
  rounded: Boolean,

  /**
   * Icon button style
   */
  icon: Boolean,

  /**
   * FAB (Floating Action Button) style
   */
  fab: Boolean,

  /**
   * Text button style
   */
  text: Boolean,

  /**
   * Removes border-radius
   */
  tile: Boolean,

  /**
   * Disables the button
   */
  disabled: Boolean,

  /**
   * Makes the button read-only
   */
  readonly: Boolean,

  /**
   * Shows loading state
   */
  loading: Boolean,

  /**
   * Custom aria-label for accessibility
   */
  ariaLabel: {type: String, default: 'btn'},

  /**
   * Active class for router-link
   */
  activeClass: String,

  /**
   * Exact active class for router-link
   */
  exactActiveClass: String,

  /**
   * Enables link styling
   */
  link: Boolean,

  /**
   * URL for link button
   */
  href: [String, Object],

  /**
   * Route location for vue-router
   */
  to: [String, Object],

  /**
   * Target attribute for links
   */
  target: String,
})

// Emits
const emit = defineEmits([
  /**
   * Emitted when button is clicked
   * @param {Event} event - Click event
   */
  'click'
])

// Inject and composables
const $r = inject('renusify').$r
const attrs = useAttrs()
const {route} = useRootable(props, attrs)

// Your existing computed properties and methods...
const computedAttributes = computed(() => {
  const computedAttrs = {...attrs}

  if (route.value.data.attrs.href) {
    computedAttrs.href = route.value.data.attrs.href
  }

  if (props.target) {
    computedAttrs.target = props.target
    computedAttrs.rel = 'noreferrer'
  }

  if (props.to) {
    computedAttrs.to = props.to
  }

  return computedAttrs
})

const buttonClasses = computed(() => {
  const prefix = $r.prefix
  const classes = [
    `${prefix}btn`,
    `size-${props.size}`
  ]

  // Style classes
  if (!props.depressed && !props.text && !props.outlined && !props.disabled) {
    classes.push('btn-contained')
  }

  if (props.depressed) classes.push('btn-depressed')
  if (props.outlined) classes.push('btn-outlined')
  if (props.text) classes.push('btn-text')
  if (props.tile) classes.push('btn-tile')
  if (props.rounded) classes.push('btn-rounded')

  // Shape classes
  if (props.icon) {
    classes.push('btn-round', 'btn-icon')
  }

  if (props.fab) {
    classes.push('btn-round', 'btn-fab')
  }

  // State classes
  if (props.loading) classes.push('btn-loading')
  if (props.block) classes.push('btn-block')
  if (props.disabled) classes.push('btn-disabled')
  if (props.readonly) classes.push('btn-readonly')

  return classes
})

const loaderSize = computed(() => {
  return props.size === 'x-small' ? '15' : '23'
})

// Methods
/**
 * Handles button click event
 * @param {Event} event - Click event
 */
const handleClick = (event) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style lang="scss">
@use "sass:map";
@use "sass:math";
@use "../../style" as *;

$btn-sizes: (
    'xs': 1.5rem, // 24px - 6 units
    'sm': 2rem, // 32px - 8 units
    'md': 2.5rem, // 40px - 10 units
    'lg': 2.75rem, // 44px - 11 units
    'xl': 3.25rem, // 52px - 13 units
    'xxl': 3.75rem, // 60px - 15 units
) !default;

$btn-font-sizes: (
    'xs': 0.625rem, // 10px
    'sm': 0.75rem, // 12px
    'md': 0.875rem, // 14px
    'lg': 1rem, // 16px
    'xl': 1.125rem, // 18px
    'xxl': 1.25rem, // 20px
) !default;

$fab-sizes: (
    'xs': 2rem, // 32px
    'sm': 2.5rem, // 40px
    'md': 3rem, // 48px
    'lg': 3.5rem, // 56px
    'xl': 4rem, // 64px
    'xxl': 4.5rem, // 72px
) !default;

$fab-icon-sizes: (
    'xs': 1rem, // 16px
    'sm': 1.25rem, // 20px
    'md': 1.5rem, // 24px
    'lg': 1.75rem, // 28px
    'xl': 2rem, // 32px
    'xxl': 2.25rem, // 36px
) !default;

@mixin button-size($size) {
  $height: map.get($btn-sizes, $size);
  $font-size: map.get($btn-font-sizes, $size);
  @if not $height {
    $height: map.get($btn-sizes, 'default');
  }
  @if not $font-size {
    $font-size: map.get($btn-font-sizes, 'default');
  }

  height: $height;
  padding: 0 math.div($height, 2);
  font-size: $font-size;
  border-radius: math.div($height, 10);
}

.#{$prefix}btn {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  flex: 0 0 auto;
  justify-content: center;
  max-width: 100%;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: map.get($transition, 'fast-out-slow-in');
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  color: inherit;

  // Default background and text color
  &:not(.btn-text):not(.btn-outlined) {
    background-color: var(--color-sheet-container-low);
    color: var(--color-on-sheet);
  }

  // States
  @include states();

  // Disabled state
  &.btn-disabled {
    @include disable-states();

    &:not(.btn-text):not(.btn-outlined) {
      background-color: var(--color-#{map-metro-get($states, 'disabled','state','color')}) !important;
    }

    &.btn-text, &.btn-outlined {
      &::before {
        opacity: 0 !important;
      }
    }
  }

  // Readonly state
  &.btn-readonly {
    pointer-events: none;
  }

  // Loading state
  &.btn-loading {
    pointer-events: none;
    transition: none;
    cursor: none;

    .btn-content {
      opacity: 0;
    }
  }

  // Ripple effect overlay
  &:before {
    border-radius: inherit;
    bottom: 0;
    color: inherit;
    content: '';
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s map.get($transition, 'ease-in-out');
    background-color: currentColor;
  }

  // Size variations for regular buttons
  &:not(.btn-round) {
    @each $name, $size in $btn-sizes {
      &.size-#{$name} {
        @include button-size($name);
      }
    }
  }

  // Icon color inheritance
  > .btn-content .#{$prefix}icon {
    color: inherit;
  }

  // Vertical orientation
  &.vertical {
    .btn-content {
      writing-mode: tb-rl;
    }
  }


  // Button content container
  .btn-content {
    align-items: center;
    color: inherit;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
    line-height: normal;

    .label {
      position: absolute;
      flex-wrap: nowrap;
      top: -10px;
      right: 0;
      border-radius: 10px 10px 10px 0;
      height: 21px;
      min-width: 20px;
    }
  }

  // Loader overlay
  .btn-loader {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  // Hover, focus, and active states for contained buttons
  &:not(.btn-text):not(.btn-outlined) {
    &.btn-active:before {
      opacity: 0.18;
    }

    &:hover:before {
      opacity: 0.08;
    }

    &:focus:before {
      opacity: 0.24;
    }
  }

  // Button width variations
  &.btn-block {
    display: flex;
    flex: 1 0 auto;
    min-width: 100% !important;
    width: auto;
  }

  // Button elevation variations
  &.btn-contained {
    @include elevation('sm');

    &:after {
      @include elevation('md');
    }

    &:active {
      @include elevation('lg');
    }
  }

  &.btn-depressed {
    box-shadow: none !important;
  }


  // Icon and FAB specific styles
  &.btn-icon,
  &.btn-fab {
    min-height: 0;
    min-width: 0;
    padding: 0;

    @each $name, $size in $fab-icon-sizes {
      &.size-#{$name} {
        .#{$prefix}icon {
          height: #{$size};
          font-size: #{$size};
          width: #{$size};

          svg {
            height: #{$size};
            width: #{$size};
          }
        }
      }
    }
  }

  &.btn-icon {
    @each $name, $size in $btn-sizes {
      &.size-#{$name} {
        height: #{$size};
        width: #{$size};
      }
    }
  }

  &.btn-fab {
    &.btn-contained {
      @include elevation('md');

      &:after {
        @include elevation('lg');
      }

      &:active {
        @include elevation('xl');
      }
    }

    &.btn-fixed,
    &.btn-absolute {
      z-index: 4;
    }

    @each $name, $size in $fab-sizes {
      &.size-#{$name} {
        height: #{$size};
        width: #{$size};

        &.btn-absolute {
          &.btn-bottom {
            bottom: #{math.div($size, -2)};
          }

          &.btn-top {
            top: #{math.div($size, -2)};
          }
        }
      }
    }
  }

  // Button style variations
  &.btn-outlined {
    border: 1px solid var(--color-border-low);

    &:before {
      border-radius: 0;
    }
  }

  &.btn-outlined,
  &.btn-round {
    .btn-content {
      .#{$prefix}icon {
        color: currentColor;
      }
    }
  }

  &.btn-outlined,
  &.btn-text {
    background-color: transparent;
    color: inherit;
  }

  &.btn-round,
  &.btn-rounded {
    &:before {
      border-radius: inherit;
    }
  }

  &.btn-round {
    border-radius: 50%;
  }

  &.btn-rounded {
    border-radius: 2rem !important;
  }

  &.btn-tile {
    border-radius: 0 !important;
  }
}
</style>

