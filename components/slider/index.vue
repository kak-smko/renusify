<template>
  <div class="slider-container"
       :style="{
        width:width+'px',
        height:(width/wPH)+'px'
           }"
       ref="sliderRef"
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
        <!-- @slot Default slot for slide content.
        Provide item(Current slide data), width(Width of the slide container), height(Height of the slide container) -->
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
          <!-- Slot for custom dots rendering
           Provide {Function} go - Function to go to a specific slide
           Provide {Number} index - Slide index -->
          <slot name="dots" :go="goToSlide" :index="n">
            <span @click.prevent="goToSlide(n)">{{ n }}</span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue'

/**
 * @example // Slider usage
 * <template>
 *   <r-slider
 *     :slides="slides"
 *     :startIndex="startIndex"
 *     :appear="appear"
 *     :speed="speed"
 *     :w-p-h="wPH"
 *     :slidesClass="slidesClass"
 *     :mode="mode"
 *     :transitionRight="transitionRight"
 *     :transitionLeft="transitionLeft"
 *     :autoplay="autoplay"
 *     :progress="progress"
 *     :arrow="arrow"
 *     :dots="dots"
 *     @index="log('index', $event)"
 *   >
 *     <template v-slot="{ item }">
 *       <div
 *         class="d-flex w-full h-full v-center h-center display-4 color-white-text"
 *         :style="{ backgroundColor: item.color }"
 *       >
 *         {{ item.name }}
 *       </div>
 *     </template>
 *   </r-slider>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * const slides = ref([
 *   { name: "one", color: "red" },
 *   { name: "two", color: "blue" },
 *   { name: "three", color: "green" }
 * ])
 *
 * const speed = ref(5000)
 * const wPH = ref(2)
 * const autoplay = ref(false)
 * const progress = ref(false)
 * const arrow = ref(false)
 * const dots = ref(true)
 * const startIndex = ref(0)
 * const appear = ref(true)
 * const slidesClass = ref("position-absolute h-full")
 * const mode = ref("")
 * const transitionRight = ref("slide-start-to-end")
 * const transitionLeft = ref("slide-end-to-start")
 *
 * // Methods
 * const log = (name, e) => {
 *   console.log(name, e)
 * }
 * <//script>
 *
 * */
const props = defineProps({
  /**
   * Array of slide data items
   * @type {Array}
   * @default () => []
   */
  slides: {
    type: Array,
    default: () => []
  },
  /**
   * Autoplay interval in milliseconds
   * @type {Number}
   * @default 5000
   */
  speed: {
    type: Number,
    default: 5000
  },
  /**
   * Width to height ratio (width/height)
   * @type {Number}
   * @default 2
   */
  wPH: {
    type: Number,
    default: 2
  },
  /**
   * Initial slide index to display
   * @type {Number}
   * @default 0
   */
  startIndex: {
    type: Number,
    default: 0
  },
  /**
   * Enables automatic slide progression
   * @type {Boolean}
   * @default false
   */
  autoplay: {
    type: Boolean,
    default: false
  },
  /**
   * Shows progress bar during autoplay
   * @type {Boolean}
   * @default false
   */
  progress: {
    type: Boolean,
    default: false
  },
  /**
   * Shows navigation arrows
   * @type {Boolean}
   * @default false
   */
  arrow: {
    type: Boolean,
    default: false
  },
  /**
   * Shows navigation dots
   * @type {Boolean}
   * @default true
   */
  dots: {
    type: Boolean,
    default: true
  },
  /**
   * Enables appear transition on initial render
   * @type {Boolean}
   * @default true
   */
  appear: {
    type: Boolean,
    default: true
  },
  /**
   * Additional CSS classes for slides container
   * @type {String|Object|Array}
   */
  slidesClass: [String, Object, Array],
  /**
   * Vue transition mode
   * @type {String}
   * @default 'out-in'
   */
  mode: {type: String, default: 'out-in'},
  /**
   * CSS transition name for right/next direction
   * @type {String}
   * @default 'slider-right'
   */
  transitionRight: {type: String, default: 'slider-right'},
  /**
   * CSS transition name for left/previous direction
   * @type {String}
   * @default 'slider-left'
   */
  transitionLeft: {type: String, default: 'slider-left'}
})

const emit = defineEmits([
  /**
   * Emitted when slide index changes
   * @param {Number} index - New slide index
   */
  'index'
])

const direction = ref(props.transitionRight)
const loaded = ref(false)
const currentIndex = ref(props.startIndex)
const loadedTimer = ref(null)
const timer = ref(null)
const width = ref(null)
const remainId = ref(null)
const remain = ref(0)
const sliderRef = ref(null)

const currentSlide = computed(() => {
  if (!props.slides.length) return null
  return props.slides[currentIndex.value % props.slides.length]
})

const doRemain = () => {
  remain.value = 0
  clearInterval(remainId.value)

  if (!props.autoplay || !props.progress) return

  remainId.value = setInterval(() => {
    remain.value += 10000 / props.speed
    if (remain.value >= 100) {
      remain.value = 100
      clearInterval(remainId.value)
    }
  }, 100)
}

const init = () => {
  if (sliderRef.value) {
    const w = sliderRef.value.clientWidth
    width.value = w || 1200
    startSlide()
    loaded.value = true
  }
}

const toggle = () => {
  clearInterval(timer.value)
  loaded.value = false

  clearTimeout(loadedTimer.value)
  loadedTimer.value = setTimeout(() => {
    loaded.value = true
  }, 500)

  startSlide()
}

const startSlide = () => {
  if (props.autoplay && props.slides.length > 1) {
    clearInterval(timer.value)
    timer.value = setInterval(next, props.speed)
    doRemain()
  }
}

/**
 * Navigates to the next slide
 */
const next = () => {
  if (props.slides.length <= 1) return

  toggle()
  direction.value = props.transitionRight

  if (currentIndex.value > props.slides.length - 2) {
    currentIndex.value = 0
  } else {
    currentIndex.value += 1
  }

  emit('index', currentIndex.value)
}

/**
 * Navigates to the previous slide
 */
const prev = () => {
  if (props.slides.length <= 1) return

  toggle()
  direction.value = props.transitionLeft

  if (currentIndex.value === 0) {
    currentIndex.value = props.slides.length - 1
  } else {
    currentIndex.value -= 1
  }

  emit('index', currentIndex.value)
}

/**
 * Navigates to a specific slide
 * @param {Number} i - Slide index to navigate to
 */
const goToSlide = (i) => {
  if (i === currentIndex.value || i < 0 || i >= props.slides.length) return

  toggle()

  if (i < currentIndex.value) {
    direction.value = props.transitionLeft
  } else {
    direction.value = props.transitionRight
  }

  currentIndex.value = i
  emit('index', currentIndex.value)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  clearInterval(timer.value)
  clearTimeout(loadedTimer.value)
  clearInterval(remainId.value)
})
</script>

<style lang="scss">
@use "sass:map";
@use "../../style" as *;


.slider-progress {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
}

.btn-left-arrow {
  position: absolute;
  top: 50%;
  @include ltr() {
    left: 20px;
  }
  @include rtl() {
    right: 20px
  }
  z-index: map.get($z-index, 'low');
}

.btn-right-arrow {
  position: absolute;
  top: 50%;
  @include rtl() {
    left: 20px;
  }
  @include ltr() {
    right: 20px
  }
  z-index: map.get($z-index, 'low');
}

.slider-right {
  &-enter-active {
    transition: all .3s ease;
  }

  &-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  &-enter-from {
    @include rtl() {
      transform: translateX(-200px);
    }
    @include ltr() {
      transform: translateX(200px);
    }

    opacity: 0;
  }

  &-leave-to {
    @include rtl() {
      transform: translateX(200px);
    }
    @include ltr() {
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
    @include rtl() {
      transform: translateX(200px);
    }
    @include ltr() {
      transform: translateX(-200px);
    }

    opacity: 0;
  }

  &-leave-to {
    @include rtl() {
      transform: translateX(-200px);
    }
    @include ltr() {
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

    span {
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

  .slider-dot--current span {
    transition: 0.5s all ease-in-out;
    background-color: currentColor;
    width: 30px;
  }
}
</style>
