<template>
  <div
      class="color-box"
      :style="{ width: totalWidth + 'px' }"
  >
    <div class="color-set">
      <Saturation
          ref="saturation"
          :hsv="{h:h,s:s,v:v}"
          :color="rgbaString"
          :size="hueHeight"
          @selectSaturation="selectSaturation"
      />
      <Hue
          ref="hue"
          :hsv="{h:h,s:s,v:v}"
          :width="hueWidth"
          :height="hueHeight"
          @selectHue="selectHue"
      />
      <Alpha
          ref="alpha"
          :color="rgbaString"
          :rgba="rgba"
          :width="hueWidth"
          :height="hueHeight"
          @selectAlpha="selectAlpha"
      />
    </div>
    <div :style="{ height: previewHeight + 'px' }" class="color-show">
      <Preview
          :color="rgbaString"
          :width="previewWidth"
          :height="previewHeight"
      />
    </div>
    <Box name="HEX" :color="hexString" @inputColor="inputHex"/>
    <Box name="RGBA" :color="rgbaString" @inputColor="inputRgba"/>
    <slot></slot>
  </div>
</template>

<script>
import {color} from './mixin'

import Saturation from './Saturation.vue'
import Hue from './Hue.vue'
import Alpha from './Alpha.vue'
import Preview from './Preview.vue'
import Box from './Box.vue'

export default {
  components: {
    Saturation,
    Hue,
    Alpha,
    Preview,
    Box
  },
  emits: ['changeColor'],
  mixins: [color],
  props: {
    color: {
      type: String,
      default: '#DD0FB2',
    }
  },
  data() {
    return {
      hueWidth: 15,
      hueHeight: 200,
      previewHeight: 30,
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
    totalWidth() {
      return this.hueHeight + (this.hueWidth + 14) * 2
    },
    previewWidth() {
      return this.totalWidth - 20
    },
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
      this.setColorValue(color)
      this.$nextTick(() => {

        this.$refs.saturation.renderColor()

        this.$refs.saturation.renderSlide()

        this.$refs.hue.renderSlide()
      })
    },
    inputRgba(color) {
      this.setColorValue(color)
      this.$nextTick(() => {
        this.$refs.saturation.renderColor()

        this.$refs.saturation.renderSlide()

        this.$refs.hue.renderSlide()
      })
    },
    selectColor(color) {
      this.setColorValue(color)
      this.$nextTick(() => {

        this.$refs.saturation.renderColor()

        this.$refs.saturation.renderSlide()

        this.$refs.hue.renderSlide()
      })
    },
  },
}
</script>

<style lang="scss">
@import "../../../style/include";

.color-box {
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
  z-index: 1;
  @include light() {
    background: #f7f8f9;
  }

  @include dark() {
    background: #1d2024;
  }

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
}
</style>
