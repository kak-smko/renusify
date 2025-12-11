<template>
  <div class="saturation">
    <canvas
        ref="canvasRef"
        v-touch="{'end': handleMove, 'move': handleMove}"
        :height="size"
        :width="size"
    />
    <div :style="style" class="slide"/>
  </div>
</template>


<script setup>
import {ref, onMounted} from 'vue'
import {useColor} from './useColor.js'

const props = defineProps({
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
})

const emit = defineEmits(['selectSaturation'])

const {createLinearGradient} = useColor()

const canvasRef = ref(null)
const ctx = ref(null)
const style = ref({})


onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d', {willReadFrequently: true})
    renderColor()
    renderSlide()
  }
})

function renderColor() {
  const size = props.size

  ctx.value.fillStyle = props.color
  ctx.value.fillRect(0, 0, size, size)

  createLinearGradient(
      'l',
      ctx.value,
      size,
      size,
      '#FFFFFF',
      'rgba(255,255,255,0)'
  )
  createLinearGradient('p', ctx.value, size, size, 'rgba(0,0,0,0)', '#000000')
}


function renderSlide() {
  style.value = {
    left: props.hsv.s * props.size - 5 + 'px',
    top: (1 - props.hsv.v) * props.size - 5 + 'px',
  }
}

function handleMove(e) {
  let x = e.current.x
  let y = e.current.y

  if (x < 0) {
    x = 0
  }
  if (y < 0) {
    y = 0
  }
  if (x > props.size) {
    x = props.size
  }
  if (y > props.size) {
    y = props.size
  }

  style.value = {
    left: x - 5 + 'px',
    top: y - 5 + 'px',
  }

  const imgData = ctx.value.getImageData(
      Math.min(x, props.size - 1),
      Math.min(y, props.size - 1),
      1,
      1
  )
  const [r, g, b] = imgData.data
  emit('selectSaturation', {r, g, b})
}

defineExpose({
  renderColor,
  renderSlide
})
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