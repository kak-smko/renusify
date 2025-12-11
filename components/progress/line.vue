<template>
    <div :class="{
        [`${$r.prefix}progress`]:true,
        'progress-rounded':rounded,
        [`size-${size}`]:true
    }">
      <span class="label" v-if="showPercent">{{ modelValue }} %</span>
      <div :class="{'progress-background':showBackground,'progress-outlined':outlined}" class="progress-container">
        <div :class="classes" :style="[styles,progressStyle]"></div>
      </div>
    </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  /**
   * Current progress value (0-100). If undefined or outside 0-100 range, shows indeterminate state.
   * @type {Number|String}
   */
  modelValue: [Number, String],
  /**
   * CSS class for progress bar color styling
   * @type {String}
   */
  color: String,
  /**
   * Additional inline styles for the progress bar. Can be a string, object, or array.
   * @type {String|Object|Array}
   */
  progressStyle: [String, Object, Array],
  /**
   * Shows percentage text alongside the progress bar
   * @type {Boolean}
   */
  showPercent: Boolean,
  /**
   * Applies outlined styling to the progress bar
   * @type {Boolean}
   */
  outlined: Boolean,
  /**
   * Applies rounded corners to the progress bar
   * @type {Boolean}
   */
  rounded: Boolean,
  /**
   * Shows background track behind the progress bar
   * @type {Boolean}
   */
  showBackground: Boolean,
  /**
   * Size variant of the progress bar
   * @type {String}
   * @default 'sm'
   * @values 'sm', 'md', 'lg', 'xl'
   */
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const emit = defineEmits([
  /**
   * Emitted when progress value changes
   * @param {Number|String} value - New progress value
   */
  'update:modelValue'
])

const isIndeterminate = computed(() => {
  if (props.modelValue !== undefined) {
    return !(props.modelValue >= 0 && props.modelValue <= 100)
  } else {
    return true
  }
})

const classes = computed(() => {
  const classList = []

  classList.push(isIndeterminate.value ? 'line-indeterminate' : 'line-determinate')

  if (props.color) {
    classList.push(props.color)
  }

  if (props.size) {
    classList.push(`size-${props.size}`)
  }

  if (props.outlined) {
    classList.push('outlined')
  }

  if (props.rounded) {
    classList.push('rounded')
  }

  if (props.showBackground) {
    classList.push('with-background')
  }

  return classList.join(' ')
})

const styles = computed(() => {
  const styleObj = {}

  if (!isIndeterminate.value && props.modelValue !== undefined) {
    styleObj.width = `${props.modelValue}%`
  }


  if (props.progressStyle) {
    if (typeof props.progressStyle === 'string') {
      props.progressStyle.split(';').forEach(style => {
        if (style.trim()) {
          const [key, value] = style.split(':').map(s => s.trim())
          if (key && value) {
            styleObj[key] = value
          }
        }
      })
    } else if (typeof props.progressStyle === 'object') {
      Object.assign(styleObj, props.progressStyle)
    }
  }

  return styleObj
})

</script>

<style lang="scss">
@use "sass:map";
@use "../../style" as *;

.#{$prefix}progress {
  text-align: center;

  .progress-outlined {
    color: var(--color-sheet-container-highest)
  }

  .line-determinate {
    background-color: var(--color-on-sheet);
  }

  .line-indeterminate {
    background-color: var(--color-on-sheet);
  }

  .progress-background {
    background-color: var(--color-sheet-container-highest);
  }

  &.progress-outlined {
    border: 1px solid;
  }

  &.progress-rounded {
    border-radius: 20px;
    overflow: hidden;
  }

  .progress-container {
    position: relative;
    display: block;
    width: 100%;
    background-clip: padding-box;
    overflow: hidden;
  }

  &.size {
    &-sm {
      .progress-container {
        height: 4px;
      }
    }

    &-md {
      .progress-container {
        height: 8px;
      }

      &.progress-outlined {
        border-width: 2px;
      }
    }

    &-lg {
      .progress-container {
        height: 12px;
      }

      &.progress-outlined {
        border-width: 3px;
      }
    }

    &-xl {
      .progress-container {
        height: 16px;
      }

      &.progress-outlined {
        border-width: 4px;
      }
    }
  }

  .line-determinate {
    position: absolute;
    top: 0;
    bottom: 0;
    transition: width .3s linear;
    border-radius: 2px;
  }

  .line-indeterminate {
    border-radius: 2px;

    &:before {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    :after {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }
  }


  @keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
}
</style>