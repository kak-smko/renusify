<template>
  <div :class="`${$r.prefix}swiper`"
       ref="swiperRef"
  >
    <!-- @slot Left navigation slot
     @binding {Function} left - Function to navigate left/previous -->
    <slot name="left" :left="left"></slot>

    <!-- @slot Right navigation slot
     @binding {Function} right - Function to navigate right/next -->
    <slot name="right" :right="right"></slot>

    <div class="swiper-container"
         ref="containerRef"
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
        <!-- @slot Default slot for swiper item content
         @binding {*} item - Current item data
         @binding {Number} index - Item index -->
        <slot :item="item" :index="i">{{ item }}</slot>
      </div>
    </div>
    <div v-if="dots" class="d-flex h-center v-center color-one-text mt-3">
      <ul class="swiper-dots pt-1">
        <li :class="{'swiper-dot--current': n === currentSlide}"
            :key="n"
            class="swiper-dot"
            v-for="n in slides">
          <!-- @slot Slot for custom dots rendering
           @binding {Function} go - Function to go to a specific slide
           @binding {Number} index - Slide index -->
          <slot name="dots" :go="goToSlide" :index="n">
            <button @click.prevent="goToSlide(n)" type="button">{{ n }}</button>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted, inject, nextTick, watch} from 'vue'

/**
 * @example // Swiper usage
 * <template>
 *   <r-swiper
 *     :items="items"
 *     :width-Item="widthItem"
 *     :dots="dots"
 *     :num-Show="numShow"
 *   >
 *     <template v-slot="{ item }">
 *       <r-card class="d-flex h-center v-center ma-2" style="height: 200px">
 *         {{ item.name }}
 *       </r-card>
 *     </template>
 *   </r-swiper>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * const items = ref([
 *   { name: 'One' },
 *   { name: 'Two' },
 *   { name: 'Three' },
 *   { name: 'Four' },
 *   { name: 'Five' },
 *   { name: 'Six' },
 *   { name: 'Seven' },
 *   { name: 'Eight' },
 *   { name: 'Nine' },
 *   { name: 'Ten' }
 * ])
 *
 * const widthItem = ref(null)
 * const dots = ref(true)
 * const numShow = ref(5)
 * <//script>
 *
 *
 * */
const props = defineProps({
  /**
   * Array of items to display in the swiper
   * @type {Array}
   */
  items: Array,
  /**
   * Fixed width for each swiper item in pixels
   * @type {Number}
   */
  widthItem: Number,
  /**
   * Shows navigation dots
   * @type {Boolean}
   */
  dots: Boolean,
  /**
   * Number of items to show simultaneously, or responsive object
   * @type {Number|Object}
   */
  numShow: [Number, Object]
})

const {$r} = inject('renusify')

const timer = ref(null)
const inMove = ref(false)
const x = ref(0)
const prePosition = ref(0)
const width = ref(null)
const slides = ref(0)
const currentSlide = ref(1)

const swiperRef = ref(null)
const containerRef = ref(null)

const itemWidth = computed(() => {
  if (width.value) {
    return width.value
  }
  if (props.widthItem) {
    return props.widthItem
  }
  return false
})


const canGoNext = computed(() => {
  const r = $r.rtl ? 1 : -1
  const maxX = (containerRef.value?.scrollWidth - swiperRef.value?.offsetWidth) / r
  return x.value * r < maxX
})

const canGoPrev = computed(() => {
  const r = $r.rtl ? 1 : -1
  return x.value * r > 0
})


/**
 * Navigates to a specific slide
 * @param {Number} n - Slide number (1-indexed)
 */
const goToSlide = (n) => {
  if (!swiperRef.value) return

  inMove.value = false
  const s = $r.rtl ? 1 : -1
  x.value = swiperRef.value.offsetWidth * (n - 1) * s
  prePosition.value = 0
  end(n)
}

/**
 * Navigates to the next/right slide
 * @param {Number|null} customX - Custom distance to move in pixels
 */
const right = (customX = null) => {
  if (!canGoNext.value) return

  const moveX = customX || itemWidth.value || 200
  clearTimeout(timer.value)

  timer.value = nextTick(() => {
    inMove.value = true
    const direction = $r.rtl ? 1 : -1
    x.value = prePosition.value - (moveX * direction)
    end()
    clearTimeout(timer.value)
  })
}

/**
 * Navigates to the previous/left slide
 * @param {Number|null} customX - Custom distance to move in pixels
 */
const left = (customX = null) => {
  if (!canGoPrev.value) return

  const moveX = customX || itemWidth.value || 200
  clearTimeout(timer.value)

  timer.value = setTimeout(() => {
    inMove.value = true
    const direction = $r.rtl ? 1 : -1
    x.value = prePosition.value + (moveX * direction)
    end()
    clearTimeout(timer.value)
  }, 50)
}

/**
 * Handles touch/mouse move events
 * @param {Object} e - Move event object with goX property
 */
const move = (e) => {
  if (inMove.value || !e?.goX) return

  inMove.value = true
  clearTimeout(timer.value)

  timer.value = setTimeout(() => {
    x.value = prePosition.value + e.goX
    inMove.value = false
  }, 50)
}

/**
 * Handles touch/mouse end events
 * @param {Number|null} current - Current slide number for direct navigation
 */
const end = (current = null) => {
  setTimeout(() => {
    inMove.value = false

    if (!swiperRef.value || !containerRef.value) return

    const r = $r.rtl ? 1 : -1
    const swiperWidth = swiperRef.value.offsetWidth
    const containerWidth = containerRef.value.scrollWidth

    if (x.value * r + swiperWidth >= containerWidth) {
      x.value = (containerWidth - swiperWidth) / r
    } else if (itemWidth.value) {
      const diff = x.value - prePosition.value
      const snapSteps = Math.round(diff / itemWidth.value)
      x.value = prePosition.value + (snapSteps * itemWidth.value)
    }

    if (x.value * r < 0) {
      x.value = 0
    }

    prePosition.value = x.value
    if (typeof current === 'number') {
      currentSlide.value = current
    } else if (swiperWidth > 0) {
      currentSlide.value = Math.ceil(x.value / swiperWidth * r) + 1
    }
  }, 60)
}

const handleResize = () => {
  if (!swiperRef.value) return

  if (props.numShow) {
    if (typeof props.numShow === 'object') {
      for (let name in props.numShow) {
        if ($r.breakpoint && $r.breakpoint[name]) {
          width.value = swiperRef.value.getBoundingClientRect().width / props.numShow[name]
          break
        }
      }
    } else {
      width.value = swiperRef.value.getBoundingClientRect().width / props.numShow
    }
  }

  nextTick(() => {
    if (containerRef.value) {
      slides.value = Math.ceil(containerRef.value.scrollWidth / swiperRef.value.offsetWidth)
    }
  })

}


onMounted(() => {
  handleResize()
})

onUnmounted(() => {
  clearTimeout(timer.value)
})


watch(() => props.items, () => {
  x.value = 0
  prePosition.value = 0
  currentSlide.value = 1

  handleResize()
}, {deep: true})
</script>

<style lang="scss">
@use "../../style" as *;

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
