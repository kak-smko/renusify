<template>
  <div class="hue ms-1">
    <canvas
        ref="canvasRef"
        v-touch="{'end': handleMove, 'move': handleMove}"
        :height="height"
        :width="width"
    />
    <div :style="slideStyle" class="slide"/>
  </div>
</template>

<script setup>
import {ref, watch, onMounted, computed} from 'vue'

const props = defineProps({
  hsv: {
    type: Object,
    default: () => ({h: 0}),
  },
  width: {
    type: Number,
    default: 15,
  },
  height: {
    type: Number,
    default: 152,
  },
})

const emit = defineEmits(['selectHue'])

const canvasRef = ref(null)
const ctx = ref(null)
const slideTop = ref('0px')

const slideStyle = computed(() => ({
  top: slideTop.value,
}))

watch(() => props.hsv?.h, () => {
  renderSlide()
}, {immediate: true})


onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d', {willReadFrequently: true})
    renderColor()
    renderSlide()
  }
})

function renderColor() {
  if (!ctx.value) return

  const gradient = ctx.value.createLinearGradient(0, 0, 0, props.height)
  gradient.addColorStop(0, '#FF0000') // red
  gradient.addColorStop(0.17 * 1, '#FF00FF') // purple
  gradient.addColorStop(0.17 * 2, '#0000FF') // blue
  gradient.addColorStop(0.17 * 3, '#00FFFF') // cyan
  gradient.addColorStop(0.17 * 4, '#00FF00') // green
  gradient.addColorStop(0.17 * 5, '#FFFF00') // yellow
  gradient.addColorStop(1, '#FF0000') // red

  ctx.value.fillStyle = gradient
  ctx.value.fillRect(0, 0, props.width, props.height)
}

function renderSlide() {
  if (!props.hsv) return

  const hue = props.hsv.h || 0
  const topPosition = (1 - hue / 360) * props.height
  slideTop.value = `${topPosition}px`
}

function handleMove(e) {
  let y = e.current.y

  if (y < 0) y = 0
  if (y > props.height) y = props.height

  slideTop.value = `${y - 2}px`

  if (!ctx.value) return

  const pixelY = Math.min(y, props.height - 1)
  const imgData = ctx.value.getImageData(0, pixelY, 1, 1)
  const [r, g, b] = imgData.data

  emit('selectHue', {r, g, b})
}

defineExpose({
  renderColor,
  renderSlide
})
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