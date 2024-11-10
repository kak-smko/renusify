<template>
  <div v-intersect.[modifier]="check" :class="{
        [$r.prefix+'img']:true,
        'img-hoverZoom':hoverZoom,'img-hoverDark':hoverDark,'img-hoverTitle':hoverTitle}"
       ref="rImg">
    <div v-if="hoverTitle" class="title-3 color-white-text img-title w-full pa-1"
         :class="{
            'title-hs':titleHs,
            'title-hc':titleHc,
            'title-he':titleHe,
            'title-vs':titleVs,
            'title-vc':titleVc,
            'title-ve':titleVe
        }"
    >{{ alt }}
    </div>
    <img v-if="load &&!isSvg" ref="img" :alt="alt" :height="size.height>0?size.height:'auto'" :src="link" :style="{'height':size.height>0?undefined:'auto',
         'width':size.width>0?undefined:'auto'
         }"
         :width="size.width>0?size.width:'auto'"
         draggable="false"/>
    <svg-img v-else-if="load &&isSvg&&link" :link="link" :size="size">
    </svg-img>
  </div>
</template>
<script>
import {defineAsyncComponent} from 'vue'

export default {
  name: 'r-img',
  components: {SvgImg:defineAsyncComponent(()=>import('./svgImg.vue'))},
  props: {
    src: {
      type: String,
      required: true
    },
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
    hoverTitle: Boolean,
    titleHs: Boolean,
    titleHc: Boolean,
    titleHe: Boolean,
    titleVs: Boolean,
    titleVc: Boolean,
    titleVe: Boolean,
    isSvg: Boolean,
    svgCache: {type: Number, default: 86400},
    wPH: Number
  },
  data() {
    return {
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
        res += 'c=' + this.svgCache
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
@import "../../style/include";

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

  &.img-hoverTitle {
    &:hover {
      .img-title {
        max-width: 100%;
      }
    }
  }

  .img-title {
    position: absolute;
    z-index: 1;
    max-width: 0;
    overflow: hidden;

    &.title-hs {
      text-align: start;
    }

    &.title-hc {
      text-align: center;
    }

    &.title-he {
      text-align: end;
    }

    &.title-vs {
      top: 10px
    }

    &.title-vc {
      top: 50%
    }

    &.title-ve {
      bottom: 10px
    }

  }
}
</style>
