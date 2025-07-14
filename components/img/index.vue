<template>
  <div v-intersect.[modifier]="check" :class="{
        [$r.prefix+'img']:true,
        'img-hoverZoom':hoverZoom,'img-hoverDark':hoverDark,'img-hover-preview':preview}"
       ref="rImg">
    <div v-if="preview" class="img-preview w-full h-full d-flex v-center h-center"
    >
      <r-btn icon @click="show_preview=true">
        <r-icon v-html="$r.icons.eye"></r-icon>
      </r-btn>
    </div>
    <img v-if="load &&!isSvg" ref="img" :alt="alt" :height="size.height>0?size.height:'auto'" :src="link" :style="{'height':size.height>0?undefined:'auto',
         'width':size.width>0?undefined:'auto'
         }"
         :width="size.width>0?size.width:'auto'"
         draggable="false"/>
    <svg-img v-else-if="load &&isSvg&&link" :link="link" :size="size">
    </svg-img>
    <teleport v-if="preview&&show_preview" :to="`.${$r.prefix}app`">
      <preview-img :src="preview" @close="show_preview=false"></preview-img>
    </teleport>
  </div>
</template>
<script>
import {defineAsyncComponent} from 'vue'

export default {
  name: 'r-img',
  components: {
    SvgImg: defineAsyncComponent(() => import('./svgImg.vue')),
    previewImg: defineAsyncComponent(() => import('./preview.vue')),
  },
  props: {
    src: {
      type: String,
      required: true
    },
    preview: String,
    alt: {
      type: String,
      required: true
    },
    lazy: {
      type: String,
      default: 'create',
      validator: function (value) {
        return ['no', 'create'].indexOf(value) !== -1
      }
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    query: String,
    autoSize: Boolean,
    hoverZoom: Boolean,
    hoverDark: Boolean,
    isSvg: Boolean,
    svgCache: {type: Number, default: 86400},
    wPH: Number
  },
  data() {
    return {
      show_preview: false,
      load: false,
      view: false,
      modifier: this.lazy !== 'no' ? 'once' : 'pre',
      time_id: null,
      size: {width: 0, height: 0}
    }
  },
  created() {
    this.activate()
  },
  computed: {
    link() {
      if (this.lazy !== 'no' && !this.view) {
        return null
      }
      let res = this.src
      if (!(res.startsWith('/') || res.startsWith('http://') || res.startsWith('https://') || res.startsWith('data:image/'))) {
        res = '/' + res
      }
      if (this.src.search('[?]') === -1) {
        res += '?'
      }
      if (this.query) {
        res += this.query
      }
      if (this.isSvg && this.svgCache) {
        res += '&c=' + this.svgCache
      }
      if (!this.isSvg && ((this.autoSize && this.size.width > 0) || this.width)) {
        res += `&w=${this.size.width}`
      }
      if (!this.isSvg && ((this.autoSize && this.size.height > 0) || this.height)) {
        res += `&h=${this.size.height}`
      }
      return res
    }
  },
  methods: {
    check(isIntersecting) {
      if (isIntersecting) {
        this.view = true
      }
    },
    getSize() {
      let res = {width: 0, height: 0}
      if (this.width) {
        res["width"] = this.width
      }
      if (this.height) {
        res["height"] = this.height
      }
      let wPH = this.wPH
      if (!wPH) {
        const ls = this.src.split('/')
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
        if (res['width'] !== 0 && res['height'] === 0) {
          res['height'] = parseInt(res['width'] / wPH)
        }
        if (res['width'] === 0 && res['height'] !== 0) {
          res['width'] = parseInt(res['height'] * wPH)
        }
      }

      if (res['width'] !== 0 || res['height'] !== 0) {
        return this.size = res
      }

      if (this.$refs.rImg && this.$refs.rImg.parentElement && this.$refs.rImg.parentElement.clientWidth > 0) {
        let cs = window.getComputedStyle(this.$refs.rImg.parentElement)
        let paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
        let borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
        let w = parseInt(parseFloat(cs.getPropertyValue('width')) - paddingX - borderX);
        return this.size = {
          width: w,
          height: parseInt(wPH ? w / wPH : 0)
        }
      }
      return false

    },
    activate() {
      this.getSize()
      if (this.size.width !== 0 || this.size.height) {
        this.load = true
      } else {
        clearTimeout(this.time_id)
        this.time_id = setTimeout(() => {
          this.activate()
        }, 100)
      }

    }
  },
  beforeUnmount() {
    clearTimeout(this.time_id)
  }
}
</script>
<style lang="scss">
@use "sass:map";
@use "../../style/variables/base";

.#{base.$prefix}img {
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
  }
}

.#{base.$prefix}img-preview-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  touch-action: none;
  background: var(--color-overlay);
  backdrop-filter: blur(3px) grayscale(30%);
  z-index: map.get(base.$z-index, 'important');
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
