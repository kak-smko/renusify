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
        <span :class="{'btn-disabled':$attrs.disabled||$attrs.readonly||(min!==undefined&&number<=min)}" class="btn">
        <r-icon v-html="$r.icons.minus"></r-icon>
      </span>
    </template>
    <div class="view-holder ltr text-center">
      <input
          ref="input"
          :autofocus="autofocus"
          :step="step"
          :min="min"
          :max="max"
          :value="number"
          :disabled="$attrs.disabled"
          :readonly="$attrs.readonly"
          autocomplete="off"
          class="text-center"
          type="number"
          @focusin="active=true"
          @focusout="active=false"
          @input="emitValue"
      />
      <div class="number-view">{{ formatNumber }}</div>
    </div>
    <template v-slot:icon>
        <span :class="{'btn-disabled':$attrs.disabled||$attrs.readonly||(max!==undefined&&number>=max)}" class="btn">
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
   * The input's model value
   * @type {String|Number}
   */
  modelValue: [String, Number],
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
  max: Number,
  /**
   * Whether decimal values are allowed
   * @type {Boolean}
   */
  isFloat: Boolean
})

const emit = defineEmits([
  /**
   * Emitted when the number value changes
   * @param {Number|undefined} value - The updated number value, undefined if invalid or empty
   */
  'update:modelValue'
])

// Reactive data
const normalizeValue = (value) => {
  if (value === undefined || value === null || value === '') return ''
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue)) return ''
  return String(props.isFloat ? numericValue : Math.trunc(numericValue))
}

const number = ref(normalizeValue(props.modelValue))
const active = ref(false)

/**
 * Emits a valid numeric value, keeping the input's editable value as a string.
 * @param {Event} [e] - Optional input event
 */
const emitValue = (e) => {
  if (e) number.value = e.target.value

  if (number.value === '' || number.value === null || number.value === undefined) {
    number.value = ''
    emit('update:modelValue', undefined)
    return
  }

  const parsedValue = Number(number.value)
  if (!Number.isFinite(parsedValue)) return

  let value = props.isFloat ? parsedValue : Math.trunc(parsedValue)
  if (props.max !== undefined && value > props.max) value = props.max
  if (props.min !== undefined && value < props.min) value = props.min

  if (!props.isFloat || value !== parsedValue) number.value = String(value)
  emit('update:modelValue', value)
}

const decimalPlaces = (value) => {
  const [coefficient, exponent = '0'] = String(value).toLowerCase().split('e')
  const fractionLength = coefficient.split('.')[1]?.length || 0
  return Math.max(0, fractionLength - Number(exponent))
}

const roundToStepPrecision = (value, currentValue) => {
  const precision = Math.min(100, Math.max(decimalPlaces(props.step), decimalPlaces(currentValue)))
  return Number(value.toFixed(precision))
}

const setButtonValue = (value) => {
  if (!props.isFloat) value = Math.trunc(value)
  if (props.min !== undefined) value = Math.max(props.min, value)
  if (props.max !== undefined) value = Math.min(props.max, value)
  number.value = String(value)
  emit('update:modelValue', value)
}

/** Increments the number by the step value without crossing the maximum. */
const plus = () => {
  if (attr.disabled || attr.readonly) return
  const parsedCurrent = Number(number.value)
  const hasCurrentValue = number.value !== '' && Number.isFinite(parsedCurrent)
  const currentValue = hasCurrentValue
    ? parsedCurrent
    : (props.min !== undefined ? props.min : 0)
  if (props.max !== undefined && currentValue >= props.max) return
  setButtonValue(roundToStepPrecision(currentValue + props.step, currentValue))
}

/** Decrements the number by the step value without crossing the minimum. */
const minus = () => {
  if (attr.disabled || attr.readonly) return
  const parsedCurrent = Number(number.value)
  const currentValue = Number.isFinite(parsedCurrent) ? parsedCurrent : 0
  if (props.min !== undefined && currentValue <= props.min) return
  setButtonValue(roundToStepPrecision(currentValue - props.step, currentValue))
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
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
  }

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart
})

// Watchers
watch(() => props.modelValue, (newVal) => {
  number.value = normalizeValue(newVal)
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
      background: transparent;

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
