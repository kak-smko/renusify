<template>
  <div class="hue ms-1">
    <canvas ref="canvas" :width="width" :height="height" v-touch="{'end':move,
                  'move':move}"/>
    <div :style="style" class="slide"/>
  </div>
</template>

<script >

export default
        {
  props: {
    hsv: {
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
  emits: ['selectHue'],
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
      const g = this.ctx.createLinearGradient(0, 0, 0, this.height)
      g.addColorStop(0, '#FF0000') // red
      g.addColorStop(0.17 * 1, '#FF00FF') // purple
      g.addColorStop(0.17 * 2, '#0000FF') // blue
      g.addColorStop(0.17 * 3, '#00FFFF') // green
      g.addColorStop(0.17 * 4, '#00FF00') // green
      g.addColorStop(0.17 * 5, '#FFFF00') // yellow
      g.addColorStop(1, '#FF0000') // red
      this.ctx.fillStyle = g
      this.ctx.fillRect(0, 0, this.width, this.height)
    },
    renderSlide() {
      this.style = {
        top: (1 - this.hsv.h / 360) * this.height + 'px',
      }
    },
    move(e) {
      let y = e.current.y

      if (y < 0) {
        y = 0
      }
      if (y > this.height) {
        y = this.height
      }

      this.style = {
        top: y - 2 + 'px',
      }

      const imgData = this.ctx.getImageData(0, Math.min(y, this.height - 1), 1, 1)
      const [r, g, b] = imgData.data
      this.$emit('selectHue', {r, g, b})
    }
  },
}
</script>

<style lang="scss">
.hue {
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
