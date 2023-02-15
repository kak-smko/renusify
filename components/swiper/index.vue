<template>
  <div :class="`${$r.prefix}swiper`"
       ref="swiper"
  >
    <slot name="left" :left="left"></slot>
    <slot name="right" :right="right"></slot>
    <div class="swiper-container"
         ref="container"
         :class="{
            'in-move':inMove
             }"
         v-touch="{
                  'end':end,
                  'move':move
                 }"
         :style="{'transform':'translate3d('+x+'px,0,0)'}">
      <div class="swiper-item"
           draggable="false"
           :style="{'min-width':itemWidth&&itemWidth+'px','width':itemWidth&&itemWidth+'px'}"
           v-for="(item,i) in items" :key="i">
        <slot :item="item" :index="i">{{ item }}</slot>
      </div>
    </div>
    <div v-if="dots" class="d-flex h-center v-center color-one-text mt-3">
      <ul class="swiper-dots pt-1">
        <li :class="{'swiper-dot--current': n === currentSlide}"
            :key="n"
            class="swiper-dot"
            v-for="n in slides">
          <slot name="dots" :go="goToSlide" :index="n">
            <button @click.prevent="goToSlide(n)" type="button">{{ n }}</button>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'r-swiper',
  props: {
    items: Array,
    widthItem: Number,
    dots: Boolean,
    numShow: [Number, Object]
  },
  data() {
    return {
      timer: null,
      inMove: false,
      x: 0,
      prePosition: 0,
      width: null,
      slides: 0,
      currentSlide: 1
    }
  },
  mounted() {
    if (this.numShow && this.$refs.swiper) {
      if (typeof this.numShow === 'object') {
        for (let name in this.numShow) {
          if (this.$r.breakpoint[name]) {
            this.width = this.$refs.swiper.getBoundingClientRect().width / this.numShow[name]
            break
          }
        }
      } else {
        this.width = this.$refs.swiper.getBoundingClientRect().width / this.numShow
      }
    }
    setTimeout(() => {
      this.slides = Math.ceil(this.$refs.container.scrollWidth / this.$refs.swiper.offsetWidth)
    }, 1000)
  },
  computed: {
    itemWidth() {
      if (this.width) {
        return this.width
      }
      if (this.widthItem) {
        return this.widthItem
      }

      return false
    }
  },
  methods: {
    goToSlide(n) {
      this.inMove = false
      let s = -1
      if (this.$r.rtl) {
        s = 1
      }
      this.x = this.$refs.swiper.offsetWidth * (n - 1) * s
      this.end()
    },
    right(x = null) {
      if (x === null) {
        x = this.itemWidth || 200
      }
      this.timer = setTimeout(() => {
        this.inMove = true
        this.x = this.prePosition - x
        this.end()
        clearTimeout(this.timer)
      }, 50)
    }, left(x = null) {
      if (x === null) {
        x = this.itemWidth || 200
      }
      this.timer = setTimeout(() => {
        this.inMove = true
        this.x = this.prePosition + x
        this.end()
        clearTimeout(this.timer)
      }, 50)
    }, move(e) {
      if (this.inMove) {
        return
      }
      this.inMove = true
      this.timer = setTimeout(() => {
        this.x = this.prePosition + e.goX
        this.inMove = false
      }, 50)
    },
    end(e) {
      setTimeout(() => {
        this.inMove = false
        const r = this.$r.rtl ? 1 : -1
        if (this.x * r + this.$refs.swiper.offsetWidth >= this.$refs.container.scrollWidth) {
          this.x = (this.$refs.container.scrollWidth - this.$refs.swiper.offsetWidth) / r
        } else if (this.itemWidth) {
          this.x = this.prePosition + Math.round((this.x - this.prePosition) / this.itemWidth) * this.itemWidth
        }

        if (this.x * r < 0) {
          this.x = 0
        }
        this.prePosition = this.x

        this.currentSlide = Math.ceil(this.x / this.$refs.swiper.offsetWidth * r) + 1
      }, 60)

    }
  }
}
</script>
<style lang="scss">
@import "../../style/include";

.#{$prefix}swiper {
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: hidden;

  .swiper-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    &:not(.in-move) {
      transition: .3s all ease-in-out;
    }

    &.in-move {
      .swiper-item {
        pointer-events: none;
      }
    }
  }

  .swiper-item {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);

    backface-visibility: hidden;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    a {
      -webkit-user-drag: none;
    }
  }

  .swiper-dots {
    align-items: inherit;
    display: flex;
    list-style: none;
    white-space: nowrap;
  }

  .swiper-dot {
    align-items: inherit;
    justify-content: center;
    display: flex;
    padding: 5px;

    button {
      transition: 0.3s all ease-in-out;
      background-color: #bfbfbf;
      outline: none;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      display: block;
      font-size: 0;
      line-height: 0;
      padding: 0;
      transition-duration: .3s;
      width: 10px;
      height: 10px;
    }
  }

  .swiper-dot--current button {
    transition: 0.5s all ease-in-out;
    background-color: currentColor;
    width: 30px;
  }

}
</style>
