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

<script>
import './style.scss'

export default {
  name: 'pline',
  props: {
    modelValue: [Number, String],
    color: String,
    progressStyle: [String, Object, Array],
    showPercent: Boolean,
    outlined: Boolean,
    rounded: Boolean,
    showBackground: Boolean,
    size: {
      type: String,
      default: 'small',
      validator: function (value) {
        return ['small', 'medium', 'large', 'x-large'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    isIndeterminate() {
      if (this.modelValue !== undefined) {
                    return !(this.modelValue >= 0 && this.modelValue <= 100)
                } else {
                    return true
                }
            },
            classes() {
                let c = ''
              c += this.isIndeterminate ? 'line-indeterminate' : 'line-determinate'

                if (this.color) {
                    c += ' ' + this.color
                }
                return c
            },
            styles() {
                let c = ''
                if (!this.isIndeterminate) {
                  c += 'width:' + this.modelValue + '%;'
                }

              return c
            }
        }
    }
</script>
