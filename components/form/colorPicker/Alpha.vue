<template>
  <div class="color-alpha ms-1">
    <canvas ref="canvas" :width="width" :height="height" v-touch="{'end':move,
                  'move':move}"/>
    <div :style="style" class="slide"/>
  </div>
</template>

<script>

import {color} from "./mixin";

export default {
  props: {
    color: {
      type: String,
      default: '#000000',
    },
    rgba: {
      type: Object,
      default: null,
    },
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 152,
    },
  },
  mixins: [color],
  emits: ['selectAlpha'],
  data() {
    return {
      style: {},
      alphaSize: 5,
      ctx: null
    }
  },
  watch: {
    color() {
      this.renderColor()
    },
    'rgba.a'() {
      this.renderSlide()
    },
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d', {willReadFrequently: true})
    this.renderColor()
    this.renderSlide()
  },
  methods: {
    renderColor() {
      const canvasSquare = this.createAlphaSquare(this.alphaSize)
      this.ctx.fillStyle = this.ctx.createPattern(canvasSquare, 'repeat')
      this.ctx.fillRect(0, 0, this.width, this.height)

      this.createLinearGradient(
          'p',
          this.ctx,
          this.width,
          this.height,
          'rgba(255,255,255,0)',
          this.color
      )
    },
    renderSlide() {
      this.style = {
        top: this.rgba.a * this.height + 'px',
      }
    },
    move(e) {
      let y = e.current.y
      if (y <= 0) {
        this.$emit('selectAlpha', 0)
        return
      }
      if (y >= this.height) {
        this.$emit('selectAlpha', 1)
        return
      }

      let a = parseFloat((y / this.height).toFixed(2))
      this.$emit('selectAlpha', a)
    }
  },
}
</script>

<style lang="scss">
.color-alpha {
  position: relative;
  cursor: pointer;

  .slide {
    position: absolute;
    left: 0;
    top: 100px;
    width: 100%;
    height: 4px;
    background: #fff;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
</style>
