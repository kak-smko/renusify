<template>
  <canvas ref="canvas" :width="width" :height="height"/>
</template>
<script>
import {color} from "./mixin";

export default {
  props: {
    color: {
      type: String,
      default: '#000000',
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 30,
    },
  },
  mixins: [color],
  data() {
    return {
      alphaSize: 7,
      ctx: null
    }
  },
  watch: {
    color() {
      this.renderColor()
    },
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d', {willReadFrequently: true})
    this.renderColor()
  },
  methods: {
    renderColor() {
      if (!this.ctx) {
        return
      }
      const canvasSquare = this.createAlphaSquare(this.alphaSize)

      this.ctx.fillStyle = this.ctx.createPattern(canvasSquare, 'repeat')
      this.ctx.fillRect(0, 0, this.width, this.height)

      this.ctx.fillStyle = this.color
      this.ctx.fillRect(0, 0, this.width, this.height)
    },
  },
}
</script>
