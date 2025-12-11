<template>
  <span ref="imgRef"></span>
</template>
<script setup>
import {ref, onMounted, nextTick} from 'vue'

const props = defineProps({
  link: String,
  size: Object
})

const imgRef = ref(null)

const replace = (svg) => {
  if (!imgRef.value) {
    nextTick(() => {
      replace(svg)
    })
    return
  }
  imgRef.value.replaceWith(svg)
}

const imgToSvg = () => {
  fetch(props.link)
      .then(response => response.text())
      .then(data => {
        const el = document.createElement('div')
        el.innerHTML = data
        const svg = el.querySelector('svg')

        if (svg && props.size) {
          svg.setAttribute('width', `${props.size.width}px`)
          svg.setAttribute('height', `${props.size.height}px`)
          replace(svg)
        }
      })
      .catch(error => {
        console.error('Failed to load SVG:', error)
      })
}

onMounted(() => {
  imgToSvg()
})

</script>

