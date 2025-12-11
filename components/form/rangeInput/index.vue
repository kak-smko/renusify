<template>
  <r-input :class="`${$r.prefix}range`"
           :modelValue="modelValue"
           active-label
  >

    <div ref="rangeRef" class="range-container">
      <div
          ref='dotRef'
          v-touch="{'end':end,
                  'move':move}"
          :style="{'transform':'translate3d('+x+'px,0,0)'}"
          class="dot"
      >
        <div
            class="d-flex v-center h-center"
            :class="{'dot-tooltip':true, 'dot-tooltip-hover':!tooltipAlways,[color]:true}">
          {{ preValue }}
        </div>
        <div :class="`dot-handle ${color}`"></div>
      </div>
      <div
          v-if="isRange"
          ref='dot2Ref'
          v-touch="{'end':end2,
                  'move':move2}"
          :style="{'transform':'translate3d('+x2+'px,0,0)'}"
          class="dot2"
      >
        <div :class="`dot-handle ${color}`"></div>
        <div
            class="d-flex v-center h-center"
            :class="{'dot-tooltip':true, 'dot-tooltip-hover':!tooltipAlways,[color]:true}">
          {{ preValue2 }}
        </div>
      </div>
      <div v-if="isRange" :class="color" class="range-color"
           :style="{'margin-right':($r.rtl?padR:padL)+'px','margin-left':($r.rtl?padL:padR)+'px'}"
      ></div>
      <div v-else :class="color" class="range-color"
           :style="{
                [$r.rtl?'margin-left':'margin-right']:(width-padR)+'px',
            }"
      ></div>
    </div>
  </r-input>
</template>

<script setup>
import {ref, computed, onMounted, inject, nextTick, watch} from 'vue'

const props = defineProps({
  /**
   * The slider's model value
   * @type {Number|Array}
   *
   * For single slider: Number
   * For range slider: Array of two numbers [minValue, maxValue]
   */
  modelValue: {
    type: [Number, Array]
  },
  /**
   * Minimum allowed value
   * @type {Number}
   * @default 0
   */
  min: {
    type: Number,
    default: 0
  },
  /**
   * Maximum allowed value
   * @type {Number}
   * @default 100
   */
  max: {
    type: Number,
    default: 100
  },
  /**
   * Color class for the slider track
   * @type {String}
   * @default 'color-one'
   */
  color: {
    type: String,
    default: 'color-one'
  },
  /**
   * Step value for slider increments
   * @type {Number}
   * @default 1
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * Always show tooltip on slider handle
   * @type {Boolean}
   */
  tooltipAlways: Boolean,
  /**
   * Disable slider interaction
   * @type {Boolean}
   */
  disabled: Boolean,
  /**
   * Enable range slider with two handles
   * @type {Boolean}
   */
  isRange: Boolean
})

const emit = defineEmits([
  /**
   * Emitted when slider value changes
   * @param {Number|Array} value - Updated slider value
   *
   * For single slider: Number value
   * For range slider: Array [minValue, maxValue]
   */
  'update:modelValue'
])

const {$r} = inject('renusify')

// Reactive data
const width = ref(0)
const inMove = ref(false)
const inMove2 = ref(false)
const x = ref(0)
const x2 = ref(0)
const prePosition = ref(0)
const prePosition2 = ref(0)
const preValue = ref(0)
const preValue2 = ref(0)

// Template refs
const rangeRef = ref(null)
const dotRef = ref(null)
const dot2Ref = ref(null)

// Computed properties
/**
 * Right padding for RTL support (first handle in range mode)
 * @returns {Number} Right padding value
 */
const padR = computed(() => {
  const r = $r.rtl ? -1 : 1
  return x.value * r
})

/**
 * Left padding for RTL support (second handle in range mode)
 * @returns {Number} Left padding value
 */
const padL = computed(() => {
  const r = $r.rtl ? -1 : 1
  return width.value - x2.value * r
})

// Methods - First handle (min value)
/**
 * Emits updated value for first handle
 * @param {Number} value - Raw value to emit
 */
const emitValue = (value) => {
  if (props.disabled) {
    return
  }
  const v = Math.round(value / props.step) * props.step
  if (v !== preValue.value) {
    emit('update:modelValue', props.isRange ? [v, preValue2.value] : v)
    preValue.value = v
  }
}

/**
 * Sets slider handle positions based on values
 * @param {Number} v - First handle value
 * @param {Number} v2 - Second handle value
 */
const set = (v, v2) => {
  const r = $r.rtl ? -1 : 1
  const calcX = (v - props.min) / (r * (props.max - props.min) / width.value)
  const calcX2 = (v2 - props.min) / (r * (props.max - props.min) / width.value)
  x.value = calcX
  x2.value = calcX2
  end()
  end2()
}

/**
 * Handles first handle movement
 * @param {Object} e - Movement event with goX property
 */
const move = (e) => {
  if (props.disabled) {
    return
  }
  inMove.value = true
  const calcX = prePosition.value + e.goX
  const r = $r.rtl ? -1 : 1
  const value = (r * (props.max - props.min) * calcX / width.value) + props.min

  if (value > props.max || (props.isRange && value > preValue2.value)) {
    if (props.isRange) {
      x.value = x2.value
    } else {
      x.value = width.value * r
    }
    emit('update:modelValue', props.isRange ? [preValue2.value, preValue2.value] : props.max)
    return
  }

  if (value < props.min) {
    x.value = 0
    emit('update:modelValue', props.isRange ? [props.min, preValue2.value] : props.min)
    return
  }

  x.value = calcX
  emitValue(value)
}

/**
 * Ends first handle movement
 */
const end = () => {
  inMove.value = false
  prePosition.value = x.value
}

// Methods - Second handle (max value, range mode only)
/**
 * Emits updated value for second handle
 * @param {Number} value - Raw value to emit
 */
const emitValue2 = (value) => {
  if (props.disabled) {
    return
  }
  const v = Math.round(value / props.step) * props.step
  if (v !== preValue2.value) {
    emit('update:modelValue', [preValue.value, v])
    preValue2.value = v
  }
}

/**
 * Handles second handle movement
 * @param {Object} e - Movement event with goX property
 */
const move2 = (e) => {
  if (props.disabled) {
    return
  }
  inMove2.value = true
  const calcX = prePosition2.value + e.goX
  const r = $r.rtl ? -1 : 1
  const value = (r * (props.max - props.min) * calcX / width.value) + props.min

  if (value > props.max) {
    x2.value = width.value * r
    emit('update:modelValue', [preValue.value, props.max])
    return
  }

  if (value < props.min || value < preValue.value) {
    x2.value = x.value
    emit('update:modelValue', [preValue.value, preValue.value])
    return
  }

  x2.value = calcX
  emitValue2(value)
}

/**
 * Ends second handle movement
 */
const end2 = () => {
  inMove2.value = false
  prePosition2.value = x2.value
}

/**
 * Initializes slider dimensions and positions
 */
const init = () => {
  nextTick(() => {
    width.value = rangeRef.value.getBoundingClientRect().width - 10
    preValue.value = props.min

    if (props.isRange && (!props.modelValue || props.modelValue.length === 0)) {
      emit('update:modelValue', [props.min, props.max])
      const r = $r.rtl ? -1 : 1
      x2.value = width.value * r
      prePosition2.value = width.value * r
      preValue2.value = props.max
    }

    if (props.modelValue && !(props.isRange && props.modelValue.length === 0)) {
      preValue.value = props.isRange ? props.modelValue[0] : props.modelValue
      preValue2.value = props.isRange ? props.modelValue[1] : props.max
    }

    set(preValue.value, preValue2.value)
  })
}

onMounted(() => {
  init()
})

watch(() => props.modelValue, () => {
  if (!inMove.value && !inMove2.value) {
    init()
  }
}, {deep: true})
</script>

<style lang="scss">
@use "../../../style" as *;

.#{$prefix}range {
  height: 30px;
  position: relative;

  .range-container {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: rgba(150, 150, 150, 0.5);

    .range-color {
      height: 5px;
      border-radius: 4px;
    }
  }

  .dot {
    position: absolute;
    top: -43px;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .dot-handle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      cursor: grabbing;

      &:hover {
        width: 16px;
        height: 16px;
        @include rtl() {
          transform: translate(2px, -2px);
        }
        @include ltr() {
          transform: translate(-2px, -2px);
        }
        border: 3px solid var(--color-one) !important;
      }
    }

    .dot-tooltip {
      &:after {
        content: '';
        width: 20px;
        height: 20px;
        transform: rotateZ(45deg);
        position: absolute;
        bottom: -1px;
        background-color: inherit;
        z-index: -1;
      }

      margin-bottom: 10px;
      position: relative;
      border-radius: 4px;
      width: auto;
      height: 30px;
      min-width: 30px;
      @include rtl() {
        transform: translateX(calc(50% - 5px));
      }
      @include ltr() {
        transform: translateX(calc(-50% + 5px));
      }
    }


    .dot-tooltip-hover {
      transition: .2s ease-in-out;
      opacity: 0;
    }

    &:hover {
      .dot-tooltip-hover {
        opacity: 1;
      }
    }
  }

  .dot2 {
    position: absolute;
    top: 0;

    .dot-handle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-top: -3px;
      cursor: grabbing;

      &:hover {
        width: 16px;
        height: 16px;
        @include rtl() {
          transform: translate(2px, -2px);
        }
        @include ltr() {
          transform: translate(-2px, -2px);
        }
        border: 3px solid var(--color-one) !important;
      }
    }

    .dot-tooltip {
      &:before {
        content: '';
        width: 20px;
        height: 20px;
        transform: rotateZ(45deg);
        position: absolute;
        top: -1px;
        background-color: inherit;
        z-index: -1;
      }

      margin-top: 10px;
      position: relative;
      border-radius: 4px;
      width: auto;
      height: 30px;
      min-width: 30px;
      @include rtl() {
        transform: translateX(calc(50% - 5px));
      }
      @include ltr() {
        transform: translateX(calc(-50% + 5px));
      }
    }


    .dot-tooltip-hover {
      transition: .2s ease-in-out;
      opacity: 0;
    }

    &:hover {
      .dot-tooltip-hover {
        opacity: 1;
      }
    }
  }

}
</style>
