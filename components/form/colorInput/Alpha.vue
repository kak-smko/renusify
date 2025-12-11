<template>
  <div class="color-alpha ms-1">
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
import {useColor} from './useColor.js'

const props = defineProps({
  color: {
    type: String,
    default: '#000000',
  },
  rgba: {
    type: Object,
    default: () => ({a: 1}),
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

const emit = defineEmits(['selectAlpha'])

const {createAlphaSquare, createLinearGradient} = useColor()

const canvasRef = ref(null)
const ctx = ref(null)
const alphaSize = 5

const slideStyle = computed(() => ({
  top: `${(props.rgba?.a || 1) * props.height}px`,
}))

watch(() => props.color, renderColor)


onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d', {willReadFrequently: true})
    renderColor()
  }
})

function renderColor() {
  if (!ctx.value) return

  const canvasSquare = createAlphaSquare(alphaSize)
  ctx.value.fillStyle = ctx.value.createPattern(canvasSquare, 'repeat')
  ctx.value.fillRect(0, 0, props.width, props.height)

  createLinearGradient(
      'p',
      ctx.value,
      props.width,
      props.height,
      'rgba(255,255,255,0)',
      props.color
  )
}

function handleMove(e) {
  let y = e.current.y

  if (y <= 0) {
    emit('selectAlpha', 0)
    return
  }

  if (y >= props.height) {
    emit('selectAlpha', 1)
    return
  }

  let a = parseFloat((y / props.height).toFixed(2))
  emit('selectAlpha', a)
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