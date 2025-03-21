<template>
  <div class="slider-container"
       :style="{
        width:width+'px',
        height:(width/wPH)+'px'
           }"
       ref="slider"
       v-touch="{
                'left':$r.rtl?prev:next,
                'right':$r.rtl?next:prev
            }">

    <r-btn v-if="arrow" class="btn-left-arrow" icon @click.prevent="prev">
      <r-icon v-html="$r.icons.chevron_left"></r-icon>
    </r-btn>
    <r-btn v-if="arrow" class="btn-right-arrow" icon @click.prevent="next">
      <r-icon v-html="$r.icons.chevron_right"></r-icon>
    </r-btn>
    <transition :appear="appear" :mode="mode" :name="direction">
      <div :key="`slider-${currentIndex}`"
           :class="[slidesClass,{'slide-loaded':loaded,'slide-loading':!loaded}]"
           class="slider-slides">
        <r-progress-line v-if="autoplay&&progress" :model-value="remain" class="slider-progress"
                         color="color-one"></r-progress-line>
        <slot v-if="width>0" :item="currentSlide" :width="width" :height="width/wPH">
          {{ currentSlide }}
        </slot>
      </div>
    </transition>
    <div class="d-flex h-center v-center color-one-text">
      <ul class="slider-dots pt-1" v-if="dots">
        <li :class="{'slider-dot--current': slides[n] === currentSlide}"
            :key="n"
            class="slider-dot"
            v-for="(i,n) in slides">
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
  name: 'r-slider',
  props: {
    slides: {
      type: Array,
      default: () => {
        return []
      }
    },
    speed: {
      type: Number,
      default: 5000
    },
    wPH: {
      type: Number,
      default: 2
    },
    startIndex: {
      type: Number,
      default: 0
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: false
    },
    dots: {
      type: Boolean,
      default: true
    },
    appear: {
      type: Boolean,
      default: true
    },
    slidesClass: [String, Object, Array],
    mode: {type: String, default: 'out-in'},
    transitionRight: {type: String, default: 'slider-right'},
    transitionLeft: {type: String, default: 'slider-left'}
  },
  emits:['index'],
  data() {
    return {
      direction: this.transitionRight,
      loaded: false,
      currentIndex: this.startIndex,
      loaded_timer: null,
      timer: null,
      width: null,
      remain_id: null,
      remain: 0,
    }
  },

  mounted: function () {
    this.init()
  },
  methods: {
    do_remain() {
      this.remain = 0
      clearInterval(this.remain_id)
      this.remain_id = setInterval(() => {
        this.remain += 10000 / this.speed
        if (this.remain >= 100) {
          this.remain = 100
          clearInterval(this.remain_id)
        }
      }, 100)
    },
    init() {
      const w = this.$refs.slider.clientWidth
      this.width = w || 1200
      this.startSlide()
      this.loaded = true
    },
    toggle() {
      clearInterval(this.timer)
      this.loaded = false
      clearTimeout(this.loaded_timer)
      this.loaded_timer = setTimeout(() => {
        this.loaded = true
      }, 500)
      this.startSlide()
    },
    startSlide: function () {
      if (this.autoplay) {
        this.timer = setInterval(this.next, this.speed)
        this.do_remain()
      }
    },

    next: function () {
      this.toggle()
      this.direction = this.transitionRight
      if (this.currentIndex > this.slides.length - 2) {
        this.currentIndex = 0
      } else {
        this.currentIndex += 1
      }
      this.$emit('index', this.currentIndex)
    },
    prev: function () {
      this.toggle()
      this.direction = this.transitionLeft
      if (this.currentIndex === 0) {
        this.currentIndex = this.slides.length - 1
      } else {
        this.currentIndex -= 1
      }
      this.$emit('index', this.currentIndex)
    },
    goToSlide(i) {
      this.toggle()
      if (i < this.currentIndex) {
        this.direction = this.transitionLeft
      } else {
        this.direction = this.transitionRight
      }

      this.currentIndex = i
      this.$emit('index', this.currentIndex)
    }
  },
  computed: {
    currentSlide: function () {
      return this.slides[
      (this.currentIndex) % this.slides.length]
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
    clearTimeout(this.loaded_timer)
    clearInterval(this.remain_id)
  }
}
</script>
<style lang="scss">
@use "sass:map";
@use "../../style/variables/base";
@use "../../style/mixins";


.slider-progress {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
}

.btn-left-arrow {
  position: absolute;
  top: 50%;
  @include mixins.ltr() {
    left: 20px;
  }
  @include mixins.rtl() {
    right: 20px
  }
  z-index: map.get(base.$z-index, 'low');
}

.btn-right-arrow {
  position: absolute;
  top: 50%;
  @include mixins.rtl() {
    left: 20px;
  }
  @include mixins.ltr() {
    right: 20px
  }
  z-index: map.get(base.$z-index, 'low');
}

.slider-right {
  &-enter-active {
    transition: all .3s ease;
  }

  &-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  &-enter-from {
    @include mixins.rtl() {
      transform: translateX(-200px);
    }
    @include mixins.ltr() {
      transform: translateX(200px);
    }

    opacity: 0;
  }

  &-leave-to {
    @include mixins.rtl() {
      transform: translateX(200px);
    }
    @include mixins.ltr() {
      transform: translateX(-200px);
    }

    opacity: 0;
  }
}

.slider-left {
  &-enter-active {
    transition: all .3s ease;
  }

  &-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  &-enter-from {
    @include mixins.rtl() {
      transform: translateX(200px);
    }
    @include mixins.ltr() {
      transform: translateX(-200px);
    }

    opacity: 0;
  }

  &-leave-to {
    @include mixins.rtl() {
      transform: translateX(-200px);
    }
    @include mixins.ltr() {
      transform: translateX(200px);
    }

    opacity: 0;
  }
}

.slider-container {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;

  .slider-slides {
    width: 100%;
    position: relative;
    display: flex;
    height: 100%;
  }

  .slider-dots {
    position: absolute;
    bottom: 10px;
    align-items: inherit;
    display: flex;
    list-style: none;
    padding: 0;
    white-space: nowrap;
    max-width: 100%;
    overflow: auto;
  }

  .slider-dot {
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

  .slider-dot--current button {
    transition: 0.5s all ease-in-out;
    background-color: currentColor;
    width: 30px;
  }
}
</style>
