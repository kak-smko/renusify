<template>
  <div
      class="color-box"
  >
    <div class="color-set">
      <Saturation
          ref="saturation"
          :hsv="{h:h,s:s,v:v}"
          :color="rgbaString"
          :size="200"
          @selectSaturation="selectSaturation"
      />
      <Hue
          ref="hue"
          :hsv="{h:h,s:s,v:v}"
          :width="15"
          :height="200"
          @selectHue="selectHue"
      />
      <Alpha
          ref="alpha"
          :color="rgbaString"
          :rgba="rgba"
          :width="15"
          :height="200"
          @selectAlpha="selectAlpha"
      />
    </div>
    <div class="color-show">
      <Preview
          :color="rgbaString"
          :width="238"
          :height="28"
      />
    </div>
    <div class="color-input">
    <span class="name">
      HEX
    </span>
      <input :value="hexString" @input="inputHex" class="value"/>
    </div>
    <div class="color-input">
    <span class="name">
      RGBA
    </span>
      <input :value="rgbaString" @input="inputRgba" class="value"/>
    </div>

    <slot></slot>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import {color} from './mixin'

export default {
  components: {
    Saturation:defineAsyncComponent(()=>import('./Saturation.vue')),
    Hue:defineAsyncComponent(()=>import('./Hue.vue')),
    Alpha:defineAsyncComponent(()=>import('./Alpha.vue')),
    Preview:defineAsyncComponent(()=>import('./Preview.vue'))
  },
  mixins: [color],
  props: {
    color: {
      type: String,
      default: '#2F1DCC',
    }
  },
  emits:['changeColor'],
  data() {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
      h: 0,
      s: 0,
      v: 0
    }
  },
  computed: {
    rgba() {
      return {
        r: this.r,
        g: this.g,
        b: this.b,
        a: this.a
      }
    },

    rgbaString() {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    },
    hexString() {
      return this.rgb2hex(this.rgba, true)
    },
  },
  created() {
    this.setColorValue(this.color)
  },
  watch: {
    color: function () {
      this.setColorValue(this.color)
    },
    rgba: function () {
      this.$emit('changeColor', {
        rgba: this.rgbaString,
        hex: this.hexString,
      })
    }
  },
  methods: {
    selectSaturation(color) {
      this.setColorValue(color)
    },
    selectHue(color) {
      this.setColorValue(color)
      this.$nextTick(() => {

        this.$refs.saturation.renderColor()

        this.$refs.saturation.renderSlide()
      })
    },
    selectAlpha(a) {
      this.a = a
    },
    inputHex(color) {
      const value = color.target.value
      if (value.length !== 7) {
        return
      }
      this.setColorValue(value)
      this.$nextTick(() => {

        this.$refs.saturation.renderColor()

        this.$refs.saturation.renderSlide()

        this.$refs.hue.renderSlide()
      })
    },
    inputRgba(color) {
      const value = color.target.value
      this.setColorValue(value)
      this.$nextTick(() => {
        this.$refs.saturation.renderColor()

        this.$refs.saturation.renderSlide()

        this.$refs.hue.renderSlide()
      })
    }
  },
}
</script>

<style lang="scss">
@import "../../../style/include";

.color-box {
  padding: 10px;
  border-radius: map-get($borders, 'sm');
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
  z-index: 1;

  canvas {
    vertical-align: top;
  }

  .color-set {
    display: flex;
  }

  .color-show {
    margin-top: 8px;
    display: flex;
  }

  .color-input {
    display: flex;
    margin-top: 8px;
    font-size: 12px;

    .name {
      width: 60px;
      height: 30px;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .value {
      flex: 1;
      height: 30px;
      min-width: 100px;
      padding: 0 12px;
      border: 0;
      box-sizing: border-box;
      text-align: left;
      direction: ltr;
    }


    .name {
      background: var(--color-sheet-container)
    }

    .value {
      background: var(--color-sheet)
    }
  }
}


</style>
