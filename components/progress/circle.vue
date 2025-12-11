<template>
  <div :aria-valuemax="100" :aria-valuemin="0"
       :aria-valuenow="indeterminate ? undefined : normalizedValue"
       :class="{[`${$r.prefix}progress-circle`]:true,
       [`${$r.prefix}progress-circle-indeterminate`]:indeterminate}"
       :style="styles"
       role="progressbar">
    <svg :style="svgStyles"
         :viewBox="`${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${2 * viewBoxSize}`"
         xmlns="http://www.w3.org/2000/svg">
      <circle :cx="2 * viewBoxSize"
              :cy="2 * viewBoxSize"
              :r="radius"
              :stroke-dasharray="strokeDashArray"
              :stroke-dashoffset="0"
              :stroke-width="strokeWidth"
              :class="`${$r.prefix}progress-circle-underlay`"
              fill="transparent"
      ></circle>
      <circle :cx="2 * viewBoxSize"
              :cy="2 * viewBoxSize"
              :r="radius"
              :stroke-dasharray="strokeDashArray"
              :stroke-dashoffset="strokeDashOffset"
              :stroke-width="strokeWidth"
              :class="`${$r.prefix}progress-circle-overlay`"
              fill="transparent"
      ></circle>
    </svg>
    <div :class="`${$r.prefix}progress-circle-info`">
      <!-- Default slot for custom progress circle content -->
      <slot>
        <span v-if="showPercent">{{ modelValue }} %</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  /**
   * Shows indeterminate/animated progress circle
   * @type {Boolean}
   */
  indeterminate: Boolean,
  /**
   * Shows percentage value in the center (when slot is not used)
   * @type {Boolean}
   */
  showPercent: Boolean,
  /**
   * Rotation angle of the progress circle in degrees
   * @type {Number|String}
   * @default 0
   */
  rotate: {
    type: [Number, String],
    default: 0
  },
  /**
   * Size of the progress circle in pixels
   * @type {Number|String}
   * @default '32'
   */
  size: {
    type: [Number, String],
    default: '32'
  },
  /**
   * Stroke width of the progress circle in pixels
   * @type {Number|String}
   * @default 4
   */
  width: {
    type: [Number, String],
    default: 4
  },
  /**
   * Current progress value (0-100)
   * @type {Number|String}
   * @default 0
   */
  modelValue: {
    type: [Number, String],
    default: 0
  }
})

const radius = 20

const circumference = computed(() => {
  return 2 * Math.PI * radius
})

const normalizedValue = computed(() => {
  const value = parseFloat(props.modelValue)

  if (isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100

  return value
})

const strokeDashArray = computed(() => {
  return Math.round(circumference.value * 1000) / 1000
})

const strokeDashOffset = computed(() => {
  return ((100 - normalizedValue.value) / 100) * circumference.value + 'px'
})

const strokeWidth = computed(() => {
  const widthNum = Number(props.width)
  const sizeNum = Number(props.size)

  if (sizeNum === 0) return 0
  return (widthNum / sizeNum) * viewBoxSize.value * 2
})

const styles = computed(() => {
  const size = props.size + 'px'
  return {
    height: size,
    width: size
  }
})

const svgStyles = computed(() => {
  return {
    transform: `rotate(${Number(props.rotate)}deg)`
  }
})

const viewBoxSize = computed(() => {
  const widthNum = Number(props.width)
  const sizeNum = Number(props.size)

  if (sizeNum === 0 || widthNum >= sizeNum) return radius
  return radius / (1 - widthNum / sizeNum)
})

</script>

<style lang="scss">
@use "sass:map";
@use "../../style" as *;


$progress-circle-rotate-animation: progress-circle-rotate 1.4s linear infinite !default;
$progress-circle-rotate-dash: progress-circle-dash 1.4s ease-in-out infinite !default;
$process-circle-intermediate-svg-transition: all .2s ease-in-out !default;
$progress-circle-underlay-stroke: rgba(0, 0, 0, 0.1) !default;
$progress-circle-overlay-transition: all .6s ease-in-out !default;

.#{$prefix}progress-circle {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }

  &-indeterminate {
    svg {
      animation: $progress-circle-rotate-animation;
      transform-origin: center center;
      transition: $process-circle-intermediate-svg-transition;
    }

    .#{$prefix}progress-circle-overlay {
      animation: $progress-circle-rotate-dash;
      stroke-linecap: round;
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0px;
    }
  }

  &-info {
    align-items: center;
    display: flex;
    justify-content: center
  }

  &-underlay {
    stroke: $progress-circle-underlay-stroke;
    z-index: 1
  }

  &-overlay {
    stroke: currentColor;
    z-index: 2;
    transition: $progress-circle-overlay-transition
  }
}

@keyframes progress-circle-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125px
  }
}

@keyframes progress-circle-rotate {
  100% {
    transform: rotate(360deg)
  }
}

</style>
