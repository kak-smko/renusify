<template>
  <canvas ref="canvasRef" :height="height" :width="width"/>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import {useColor} from './useColor.js'

const props = defineProps({
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
})

const {createAlphaSquare} = useColor()

const canvasRef = ref(null)
const ctx = ref(null)
const alphaSize = ref(7)

watch(() => props.color, renderColor)

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d', {willReadFrequently: true})
    renderColor()
  }
})

function renderColor() {
  if (!ctx.value) return

  const canvasSquare = createAlphaSquare(alphaSize.value)
  ctx.value.fillStyle = ctx.value.createPattern(canvasSquare, 'repeat')
  ctx.value.fillRect(0, 0, props.width, props.height)

  ctx.value.fillStyle = props.color
  ctx.value.fillRect(0, 0, props.width, props.height)
}
</script>