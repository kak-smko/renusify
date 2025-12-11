<template>
  <r-input :active="active"
           :class="`${$r.prefix}number-input`"
           :icon="$r.icons.plus"
           :modelValue="modelValue"
           :pre-icon="$r.icons.minus"
           @icon="plus"
           @pre-icon="minus"
  >
    <template v-slot:preIcon>
        <span :class="{'btn-disabled':min!==undefined&&number<=min}" class="btn">
        <r-icon v-html="$r.icons.minus"></r-icon>
      </span>
    </template>
    <div class="view-holder ltr text-center">
      <input
          ref="input"
          :autofocus="autofocus"
          :step="step"
          :value="number"
          autocomplete="no"
          class="text-center"
          type="number"
          @focusin="active=true"
          @focusout="active=false"
          @input="emitValue"
      />
      <div class="number-view" v-html="formatNumber"></div>
    </div>
    <template v-slot:icon>
        <span :class="{'btn-disabled':max!==undefined&&number>=max}" class="btn">
        <r-icon v-html="$r.icons.plus"></r-icon>
      </span>
    </template>
  </r-input>
</template>

<script setup>
import {ref, watch, computed, useAttrs} from 'vue'

const attr = useAttrs()
const placeholder = attr.placeholder
const autofocus = attr.autofocus

const props = defineProps({
  /**
   * The input's model value (number or string)
   * @type {Number|String}
   */
  modelValue: [Number, String],
  /**
   * Step value for increment/decrement buttons
   * @type {Number}
   * @default 1
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * Number of digits to group with commas for display
   * @type {Number}
   * @default 0
   *
   * When greater than 0, formats numbers with commas (e.g., 1000 becomes 1,000)
   * Set to 0 to disable number formatting
   */
  split: {
    type: Number,
    default: 0
  },
  /**
   * Minimum allowed value
   * @type {Number}
   */
  min: Number,
  /**
   * Maximum allowed value
   * @type {Number}
   */
  max: Number
})

const emit = defineEmits([
  /**
   * Emitted when the number value changes
   * @param {Number|undefined} value - The updated number value, undefined if invalid or empty
   */
  'update:modelValue'
])

// Reactive data
const number = ref(props.modelValue)
const active = ref(false)

// Methods
/**
 * Emits the updated value to parent component
 * @param {Event} [e=false] - Optional event object from input
 */
const emitValue = (e = false) => {
  if (e) {
    number.value = e.target.value
  }

  if (number.value === '' || number.value === null) {
    number.value = undefined
    emit('update:modelValue', number.value)
    return
  }

  let value = number.value

  if (props.max !== undefined && value > props.max) {
    value = props.max
  }
  if (props.min !== undefined && value < props.min) {
    emit('update:modelValue', undefined)
    return;
  }

  number.value = value
  emit('update:modelValue', number.value)
}

/**
 * Increments the number by the step value
 */
const plus = () => {
  const currentValue = parseFloat(props.modelValue || props.min || 0)
  number.value = currentValue + props.step
  emitValue()
}

/**
 * Decrements the number by the step value
 */
const minus = () => {
  const currentValue = parseFloat(props.modelValue || 0)
  number.value = currentValue - props.step
  emitValue()
}

// Computed properties
/**
 * Formats the number for display with optional thousands separator
 * @returns {String} Formatted number string or placeholder
 */
const formatNumber = computed(() => {
  if (number.value == null || number.value === '') return placeholder || ''

  if (isNaN(number.value)) return number.value.toString()

  const txt = number.value.toString()
  const [integerPart, decimalPart = ''] = txt.split('.')

  if (props.split > 0) {
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '<span class="sep">,</span>')
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
  }

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart
})

// Watchers
watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    number.value = newVal
  }
})
</script>

<style lang="scss">
@use "sass:map";
@use "../../../style" as *;


.#{$prefix}number-input {
  text-align: center;

  .view-holder {
    position: relative;
    width: 100%;
    height: 32px;

    .number-view, input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 32px;
      max-height: 32px;
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      overflow: hidden;
      @include typography($headings, 'body-1');
      letter-spacing: 1px;
    }

    .sep {
      width: 0px;
      transform: translateX(-2.5px);
    }

    .number-view {
      z-index: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    input {
      z-index: 1;
      -webkit-font-smoothing: antialiased;
      -webkit-text-fill-color: transparent;

      &::selection {
        background-color: var(--color-one);
        -webkit-text-fill-color: var(--color-on-one);
        color: var(--color-on-one);
      }
    }
  }

  .input-control {
    @include rtl() {
      flex-direction: row-reverse;
    }
    padding: 0;
  }

  .btn-disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: none;
  }

  .pre-icon, .icon {
    border-radius: inherit;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: var(--color-sheet-container-low);
    padding: 4px;
    width: 30px;
    height: 30px;
    border-radius: inherit;
  }
}

</style>
