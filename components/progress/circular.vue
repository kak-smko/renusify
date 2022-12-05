<template>
  <div :aria-valuemax="100" :aria-valuemin="0"
       :aria-valuenow="indeterminate ? undefined : normalizedValue"
       :class="{[`${$r.prefix}progress-circular`]:true,
       [`${$r.prefix}progress-circular-indeterminate`]:indeterminate}"
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
              :class="`${$r.prefix}progress-circular-underlay`"
              fill="transparent"
      ></circle>
      <circle :cx="2 * viewBoxSize"
              :cy="2 * viewBoxSize"
              :r="radius"
              :stroke-dasharray="strokeDashArray"
              :stroke-dashoffset="strokeDashOffset"
              :stroke-width="strokeWidth"
              :class="`${$r.prefix}progress-circular-overlay`"
              fill="transparent"
      ></circle>
    </svg>
    <div :class="`${$r.prefix}progress-circular-info`">
      <slot>
        <span v-if="showPercent">{{ modelValue }} %</span>
      </slot>
    </div>
  </div>
</template>

<script>
import './style.scss'

export default {
  name: 'circular',
  props: {
    indeterminate: Boolean,
    showPercent: Boolean,
    rotate: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: String,
      default: '32'
    },
    width: {
      type: [Number, String],
      default: 4
    },
    modelValue: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    radius: 20
  }),
  computed: {

    circumference () {
      return 2 * Math.PI * this.radius
    },

    normalizedValue () {
      if (this.modelValue < 0) {
        return 0
      }

      if (this.modelValue > 100) {
        return 100
      }

      return parseFloat(this.modelValue)
    },

    strokeDashArray () {
      return Math.round(this.circumference * 1000) / 1000
    },

    strokeDashOffset () {
      return (100 - this.normalizedValue) / 100 * this.circumference + 'px'
    },

    strokeWidth () {
      return Number(this.width) / +this.size * this.viewBoxSize * 2
    },

    styles () {
      const size= this.size + 'px'
      return `height: ${size};
        width: ${size}`
    },

    svgStyles () {
      return `transform: rotate(${Number(this.rotate)}deg)`
    },

    viewBoxSize () {
      return this.radius / (1 - Number(this.width) / +this.size)
    }

  }
}
</script>
