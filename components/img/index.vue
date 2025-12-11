<template>
  <div v-intersect.[modifier]="check" :class="{
        [$r.prefix+'img']:true,
        'img-hoverZoom':hoverZoom,'img-hoverDark':hoverDark,'img-hover-preview':preview}"
       ref="rImg">
    <div v-if="preview" class="img-preview d-flex v-center h-center"
    >
      <r-btn icon @click="show_preview=true">
        <r-icon v-html="$r.icons.eye"></r-icon>
      </r-btn>
    </div>
    <img v-if="load &&!isSvg" ref="img" :alt="alt"
         :height="size.height>0?size.height:'auto'"
         :width="size.width>0?size.width:'auto'"
         :sizes="size.width>0?size.width+'px':'auto'"
         :src="link"
         :srcset="srcset"
         :style="{'height':size.height>0?undefined:'auto',
         'width':size.width>0?undefined:'auto'
         }"
         draggable="false"/>
    <svg-img v-else-if="load &&isSvg&&link" :link="link" :size="size">
    </svg-img>
    <teleport v-if="preview&&show_preview" :to="`.${$r.prefix}app`">
      <preview-img :src="preview" @close="show_preview=false"></preview-img>
    </teleport>
  </div>
</template>
<script setup>
import {defineAsyncComponent, ref, computed, onMounted, nextTick} from 'vue'

const props = defineProps({
  /**
   * Source URL of the image
   * Required: true
   * Example: 'https://codenus.com/pwa/logo'
   */
  src: {
    type: String,
    required: true
  },

  /**
   * Preview image URL for high resolution image
   * Example: 'https://codenus.com/pwa/logo'
   */
  preview: String,

  /**
   * Alternative text for the image (accessibility)
   * Required: true
   * Example: 'A beautiful sunset over the mountains'
   */
  alt: {
    type: String,
    required: true
  },

  /**
   * Lazy loading behavior
   * Allowed values: 'no', 'create'
   * - 'no': No lazy loading
   * - 'create': Create lazy loading instance
   */
  lazy: {
    type: String,
    default: 'create',
    validator: (value) => ['no', 'create'].includes(value)
  },

  /**
   * Width of the image
   * Example: '100%', 300, '200px'
   */
  width: {
    type: [String, Number]
  },

  /**
   * Height of the image
   * Example: 'auto', 200, '150px'
   */
  height: {
    type: [String, Number]
  },

  /**
   * Query parameters to append to the image URL
   * Example: '?quality=80&format=webp'
   */
  query: String,

  /**
   * Whether to automatically generate srcset for responsive images
   */
  autoSrcset: {type: Boolean, default: true},

  /**
   * Whether to automatically calculate image dimensions
   */
  autoSize: Boolean,

  /**
   * Whether to enable zoom on hover effect
   */
  hoverZoom: Boolean,

  /**
   * Whether to apply dark overlay on hover
   */
  hoverDark: Boolean,

  /**
   * Whether the image is an SVG file
   */
  isSvg: Boolean,

  /**
   * Cache duration for SVG files in seconds
   * Default: 86400 (24 hours)
   */
  svgCache: {type: Number, default: 86400},

  /**
   * Width-per-height ratio (aspect ratio)
   * Example: 1.777 (for 16:9 aspect ratio)
   */
  wPH: Number
})

const SvgImg = defineAsyncComponent(() => import('./svgImg.vue'))
const PreviewImg = defineAsyncComponent(() => import('./preview.vue'))

const show_preview = ref(false)
const load = ref(false)
const view = ref(false)
const modifier = computed(() => props.lazy !== 'no' ? 'once' : 'pre')
const srcset = ref(null)
const size = ref({width: 0, height: 0})

const rImg = ref(null)

const link = computed(() => {
  if (props.lazy !== 'no' && !view.value) {
    return null
  }

  let res = props.src
  if (!(res.startsWith('/') || res.startsWith('http://') || res.startsWith('https://') || res.startsWith('data:image/'))) {
    res = '/' + res
  }

  if (props.src.search('[?]') === -1) {
    res += '?'
  }

  if (props.query) {
    res += props.query
  }

  if (props.isSvg && props.svgCache) {
    res += '&c=' + props.svgCache
  }

  if (!props.isSvg && ((props.autoSize && size.value.width > 0) || props.width)) {
    res += `&w=${size.value.width}`
  }

  if (!props.isSvg && ((props.autoSize && size.value.height > 0) || props.height)) {
    res += `&h=${size.value.height}`
  }

  return res
})

const set_srcset = (wph) => {
  if (!props.autoSrcset) return

  let src = props.src
  if (src.search('[?]') === -1) {
    src += '?'
  }
  if (props.query) {
    src += props.query
  }

  const sizes = [300, 600, 900, 1200]
  const srcs = sizes.map(width => {
    const height = parseInt(width / wph)
    return `${src}&w=${width}&h=${height} ${width}w`
  })
  srcset.value = srcs.join(',')
}

const check = (isIntersecting) => {
  if (isIntersecting) {
    view.value = true
  }
}

const getSize = () => {
  const res = {width: 0, height: 0}

  if (props.width) {
    res.width = props.width
  }
  if (props.height) {
    res.height = props.height
  }

  let wPH = props.wPH
  if (!wPH) {
    const ls = props.src.split('/')
    if (ls.length > 0) {
      const p = ls[ls.length - 1].split('_')
      if (p.length === 3) {
        const p0 = parseInt(p[0])
        const p1 = parseInt(p[1])
        if (p0 && p1) {
          wPH = p0 / p1
        }
      } else {
        wPH = 1
      }
    }
  }

  if (wPH) {
    if (res.width !== 0 && res.height === 0) {
      res.height = parseInt(res.width / wPH)
    }
    if (res.width === 0 && res.height !== 0) {
      res.width = parseInt(res.height * wPH)
    }
  }

  if (res.width !== 0 || res.height !== 0) {
    set_srcset(res.width / res.height)
    size.value = res
    return size.value
  }

  if (rImg.value && rImg.value.parentElement && rImg.value.parentElement.clientWidth > 0) {
    const cs = window.getComputedStyle(rImg.value.parentElement)
    const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
    const borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)
    const w = parseInt(parseFloat(cs.getPropertyValue('width')) - paddingX - borderX)
    set_srcset(wPH)
    size.value = {
      width: w,
      height: parseInt(wPH ? w / wPH : 0)
    }
    return size.value
  }

  return false
}

const activate = () => {
  getSize()
  if (size.value.width !== 0 || size.value.height) {
    load.value = true
  } else {
    nextTick(() => {
      activate()
    })
  }
}

onMounted(() => {
  nextTick(() => {
    activate()
  })
})

</script>

<style lang="scss">
@use "sass:map";
@use "../../style" as *;

.#{$prefix}img {
  position: relative;
  display: inline-flex;
  max-width: 100%;
  overflow: hidden;
  z-index: 0;

  img {
    transition: 0.3s all ease-in-out;
  }

  &.img-hoverZoom {
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }

  &.img-hoverDark {
    &:hover {
      background-color: black;

      img {
        opacity: 0.5;
      }
    }
  }

  &.img-hover-preview {
    &:hover {
      .img-preview {
        background: rgba(0, 0, 0, 0.5);
        max-width: 100%;
      }
    }
  }

  .img-preview {
    transition: 0.1s all ease;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    max-width: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}

.#{$prefix}img-preview-container {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: fixed;
  touch-action: none;
  background: var(--color-overlay);
  backdrop-filter: blur(3px) grayscale(30%);
  z-index: map.get($z-index, 'veryImportant');
  top: 0;
  left: 0;

  .image-wrapper {
    position: absolute;
    will-change: transform;
  }

  .image-wrapper img {
    display: block;
  }

  .controls {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    gap: 10px;
    align-items: center;
    z-index: 2;
  }

  .controls button {
    padding: 2px 8px;
    cursor: pointer;
  }
}
</style>
