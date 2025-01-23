<template>
  <div class="saturation">
    <canvas ref="canvas" :width="size" :height="size" v-touch="{'end':move,
                  'move':move}"/>
    <div :style="style" class="slide"/>
  </div>
</template>

<script>
import {color} from "./mixin.js";

export default {
  props: {
    color: {
      type: String,
      default: '#000000',
    },
    hsv: {
      type: Object,
      default: null,
    },
    size: {
      type: Number,
      default: 152,
    },
  },
  mixins: [color],
  emits: ['selectSaturation'],
  data() {
    return {
      style: {},
      ctx: null
    }
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d', {willReadFrequently: true})
    this.renderColor()
    this.renderSlide()
  },
  methods: {
    renderColor() {
      const size = this.size

      this.ctx.fillStyle = this.color
      this.ctx.fillRect(0, 0, size, size)

      this.createLinearGradient(
          'l',
          this.ctx,
          size,
          size,
          '#FFFFFF',
          'rgba(255,255,255,0)'
      )
      this.createLinearGradient('p', this.ctx, size, size, 'rgba(0,0,0,0)', '#000000')
    },
    renderSlide() {
      this.style = {
        left: this.hsv.s * this.size - 5 + 'px',
        top: (1 - this.hsv.v) * this.size - 5 + 'px',
      }
    },
    move(e) {
      let x = e.current.x
      let y = e.current.y

      if (x < 0) {
        x = 0
      }
      if (y < 0) {
        y = 0
      }
      if (x > this.size) {
        x = this.size
      }
      if (y > this.size) {
        y = this.size
      }

      this.style = {
        left: x - 5 + 'px',
        top: y - 5 + 'px',
      }

      const imgData = this.ctx.getImageData(
          Math.min(x, this.size - 1),
          Math.min(y, this.size - 1),
          1,
          1
      )
      const [r, g, b] = imgData.data
      this.$emit('selectSaturation', {r, g, b})
    }
  },
}
</script>

<style lang="scss">
.saturation {
  position: relative;
  cursor: pointer;

  .slide {
    position: absolute;
    left: 100px;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
</style>
