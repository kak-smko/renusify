<template>
  <r-input :class="`${$r.prefix}range`"
           :modelValue="modelValue"
           active
           hide
           tile
  >

    <div class="range-container" ref="range">
      <div
          ref='dot'
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
          ref='dot2'
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
<script>

export default {
  name: 'r-range',
  props: {
    modelValue: {
      type: [Number, Array]
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
      default: 'color-one'
    },
    step: {
      type: Number,
      default: 1
    },
    tooltipAlways: Boolean,

    disabled: Boolean,
    isRange: Boolean

  },
  data() {
    return {
      width: 0,
      inMove: false,
      inMove2: false,
      x: 0,
      x2: 0,
      prePosition: 0,
      prePosition2: 0,
      preValue: 0,
      preValue2: 0,
    }
  },
  mounted() {
    this.width = this.$refs.range.getBoundingClientRect().width - 10
    this.preValue = this.min
    if (this.isRange && !this.modelValue) {
      this.$emit('update:modelValue', [])
      const r = this.$r.rtl ? -1 : 1
      this.x2 = this.width * r
      this.prePosition2 = this.width * r
      this.preValue2 = this.max
    }
    if (this.modelValue !== undefined) {
      this.preValue = this.isRange ? this.modelValue[0] : this.modelValue
      this.preValue2 = this.modelValue[1]
    }

    this.set(this.preValue, this.preValue2)

  },
  computed: {
    padR() {
      const r = this.$r.rtl ? -1 : 1
      return this.x * r
    },
    padL() {
      const r = this.$r.rtl ? -1 : 1
      return this.width - this.x2 * r
    }
  },
  methods: {
    emit(value) {
      if (this.disabled) {
        return
      }
      const v = Math.round(value / this.step) * this.step
      if (v !== this.preValue) {
        this.$emit('update:modelValue', this.isRange ? [v, this.preValue2] : v)
        this.preValue = v
      }
    },
    set(v, v2) {
      const r = this.$r.rtl ? -1 : 1
      const x = (v - this.min) / (r * (this.max - this.min) / this.width)
      const x2 = (v2 - this.min) / (r * (this.max - this.min) / this.width)
      this.x = x
      this.x2 = x2
      this.end()
      this.end2()
    },
    move(e) {
      if (this.disabled) {
        return
      }
      this.inMove = true
      const x = this.prePosition + e.goX
      const r = this.$r.rtl ? -1 : 1
      const value = (r * (this.max - this.min) * x / this.width) + this.min
      if (value > this.max || (this.isRange && value > this.preValue2)) {
        if (this.isRange) {
          this.x = this.x2
        } else {
          this.x = this.width * r
        }
        this.$emit('update:modelValue', this.isRange ? [this.preValue2, this.preValue2] : this.max)
        return
      }
      if (value < this.min) {
        this.x = 0
        this.$emit('update:modelValue', this.isRange ? [this.min, this.preValue2] : this.min)
        return
      }
      this.x = x
      this.emit(value)
    },
    end() {
      this.inMove = false
      this.prePosition = this.x
    },
    emit2(value) {
      if (this.disabled) {
        return
      }
      const v = Math.round(value / this.step) * this.step
      if (v !== this.preValue2) {
        this.$emit('update:modelValue', [this.preValue, v])
        this.preValue2 = v

      }
    },
    move2(e) {
      if (this.disabled) {
        return
      }
      this.inMove2 = true
      const x = this.prePosition2 + e.goX
      const r = this.$r.rtl ? -1 : 1
      const value = (r * (this.max - this.min) * x / this.width) + this.min
      if (value > this.max) {
        this.x2 = this.width * r
        this.$emit('update:modelValue', [this.preValue, this.max])
        return
      }
      if (value < this.min || value < this.preValue) {
        this.x2 = this.x1
        this.$emit('update:modelValue', [this.preValue, this.preValue])
        return
      }

      this.x2 = x
      this.emit2(value)
    },
    end2() {
      this.inMove2 = false
      this.prePosition2 = this.x2
    }
  }
}
</script>
<style lang="scss">
@import "../../style/include";

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
        border: 3px solid var(--color-two) !important;
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
        @include ltr {
          transform: translate(-2px, -2px);
        }
        border: 3px solid var(--color-two) !important;
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
