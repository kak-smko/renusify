<template>
  <teleport v-if="show" :to="`.${$r.prefix}app`">
    <div :class="`${$r.prefix}tour-layer`" :style="style"></div>
    <transition name="slide-up" mode="out-in">
      <div v-if="msg" ref="tourMsgRef" :class="`${$r.prefix}tour-msg headline-1`" :style="style_msg">
        <r-container>
          <div v-html="$helper.cleanXss(steps[run].msg)"></div>
          <div class="d-flex">
            <div><span
                class="title-2 color-success br-lg py-1 px-2 ltr">{{ steps.length }} / {{ run + 1 }}</span>
            </div>
            <r-spacer></r-spacer>
            <r-btn v-if="has_prev" :class="`color-info ${$r.prefix}tour-clickable`" :disabled="disable_prev"
                   @click.prevent="prev">
              {{ $t('prev', 'renusify') }}
            </r-btn>
            <r-btn v-if="has_next" :class="`color-info mx-1 ${$r.prefix}tour-clickable`"
                   :disabled="disable_next"
                   @click.prevent="next">
              {{ $t('next', 'renusify') }}
            </r-btn>
            <r-btn v-if="steps.length===run+1||canFinish" :disabled="disable_finish"
                   :class="`color-success mx-1 ${$r.prefix}tour-clickable`"
                   @click.prevent="finish">{{ $t('finish', 'renusify') }}
            </r-btn>
          </div>
        </r-container>
      </div>
    </transition>
  </teleport>
</template>
<script setup>
import {ref, computed, onMounted, watch, inject} from 'vue'

/**
 * @example // Tour usage
 * <template>
 *   <div>
 *     <div class="header1 py-4">header1</div>
 *     <div class="header2 py-4">header2</div>
 *     <div>
 *       <r-btn id="one" @click="checkCode('click btn')">Click</r-btn>
 *     </div>
 *     <r-tour
 *       abort-on-not-found
 *       ref="tour"
 *       :steps="[
 *         { msg: 'Item One is on', key: '.header1' },
 *         {
 *           msg: 'this is Btn',
 *           key: '#one',
 *           options: {
 *             clickable: true,
 *             disable_next: true,
 *           },
 *         },
 *         { msg: 'Item Two', key: '.header2' },
 *       ]"
 *     ></r-tour>
 *   </div>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * // Template ref
 * const tour = ref(null)
 *
 * // Methods
 * const checkCode = (e) => {
 *   console.log(e)
 *   if (tour.value) {
 *     tour.value.next()
 *   }
 * }
 * <//script>
 *
 *
 * */
const props = defineProps({
  /**
   * Array of step configurations for the tour
   * @type {Array}
   * @default () => []
   */
  steps: {
    type: Array, default: () => {
      return []
    }
  },
  /**
   * Allows finishing the tour (shows finish button)
   * @type {Boolean}
   */
  canFinish: Boolean,
  /**
   * Aborts the tour when a step element is not found
   * @type {Boolean}
   */
  abortOnNotFound: Boolean,
  /**
   * Delay in milliseconds before starting the tour
   * @type {Number}
   * @default 2000
   */
  delay: {type: Number, default: 2000}
})

const {$helper, $storage, $r} = inject('renusify')

const show = ref(false)
const finished = ref(false)
const disable_next = ref(false)
const disable_prev = ref(false)
const disable_finish = ref(false)
const style = ref({})
const style_msg = ref({})
const msg = ref(null)
const run = ref(0)
const tourMsgRef = ref(null)

const has_next = computed(() => {
  if (finished.value) {
    console.log('tour finished has_next:' + run.value)
    reset()
    return false
  }
  return $helper.ifHas(props.steps, false, run.value + 1, 'key')
})

const has_prev = computed(() => {
  if (finished.value) {
    console.log('tour finished has_prev:' + run.value)
    reset()
    return false
  }
  return $helper.ifHas(props.steps, false, run.value - 1, 'key')
})

const elm = computed(() => {
  if (finished.value) {
    console.log('tour finished step:' + run.value)
    reset()
    return null
  }
  const key = $helper.ifHas(props.steps, false, run.value, 'key')
  if (key) {
    return document.querySelector(key)
  }
  console.log(key + ': key not found in step:' + run.value)
  return null
})

const _getOffsetLeft = (elem) => {
  let box = elem.getBoundingClientRect();

  let body = document.body;
  let docEl = document.documentElement;

  let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  let clientTop = docEl.clientTop || body.clientTop || 0;
  let clientLeft = docEl.clientLeft || body.clientLeft || 0;

  let top = box.top + scrollTop - clientTop;
  let left = box.left + scrollLeft - clientLeft;

  return {top: Math.round(top), left: Math.round(left)};
}

/**
 * Resets all tour styling and state
 */
const reset = () => {
  style.value = {}
  style_msg.value = {}
  msg.value = null
  disable_next.value = false
  disable_prev.value = false
  disable_finish.value = false
}

/**
 * Finishes the tour and cleans up
 */
const finish = () => {
  document.documentElement.classList.remove($r.prefix + 'disable-event')
  document.documentElement.style.overflow = 'auto';
  const item = props.steps[run.value]
  if (item.onFinish) {
    item.onFinish()
  }
  finished.value = true
  run.value = 0
  reset()
  $storage.set("tour_finish", true);
}

/**
 * Moves to the previous step in the tour
 */
const prev = () => {
  reset()
  const item = props.steps[run.value]
  if (item.onPrev) {
    item.onPrev()
  }
  run.value--
  const s = _show()
  if (!s && run.value > 0) {
    prev()
  }
}

/**
 * Moves to the next step in the tour
 */
const next = () => {
  reset()
  const item = props.steps[run.value]
  if (item.onNext) {
    item.onNext()
  }
  run.value++
  const s = _show()
  if (!s && run.value < props.steps.length - 1) {
    next()
  }
}

const _show = () => {
  msg.value = null
  if (elm.value && !finished.value) {
    const item = props.steps[run.value]

    if (item.before) {
      item.before()
    }
    if (item.options) {
      if (item.options.clickable) {
        elm.value.classList.add($r.prefix + 'tour-clickable')
      }
      for (let key in item.options) {
        if ($helper.hasKey(item.options, key)) {
          // This part needs adjustment since we can't set computed property
          if (key === 'disable_next') disable_next.value = item.options[key]
          if (key === 'disable_prev') disable_prev.value = item.options[key]
          if (key === 'disable_finish') disable_finish.value = item.options[key]
        }
      }
    }
    msg.value = item['msg']
    setTimeout(() => {
      elm.value.scrollIntoView()
      let msgDiv = tourMsgRef.value.getBoundingClientRect()
      document.documentElement.classList.add($r.prefix + 'disable-event')
      document.documentElement.style.overflow = 'hidden';
      const b = elm.value.getBoundingClientRect()
      const s = window.getComputedStyle(elm.value)
      const p = _getOffsetLeft(elm.value)
      style.value.width = b.width + 'px'
      style.value.height = b.height + 'px'
      style.value.top = p.top + 'px'
      style.value.left = p.left + 'px'

      style.value['border-radius'] = s['border-radius']
      style.value.opacity = 1

      let scroll = p.top
      if (msgDiv.height < p.top) {
        scroll = p.top - msgDiv.height
        style_msg.value.top = scroll + 'px'
      } else {
        style_msg.value.top = scroll + b.height + 'px'
      }

      window.scroll({
        top: scroll,
        behavior: 'smooth'
      });
      if (item.after) {
        item.after()
      }
    }, 1)
    return true
  } else if (props.abortOnNotFound) {
    console.log('abort on not found tour')
    finish()
  }
  return false
}

// Lifecycle hooks
onMounted(() => {
  setTimeout(() => {
    show.value = true;
    setTimeout(() => {
      _show()
    }, props.delay)
  }, 10)
})

watch(() => $r.breakpoint.height, () => {
  _show()
})

defineExpose({
  /**
   * Moves to the next step
   */
  next,
  /**
   * Moves to the previous step
   */
  prev,
  /**
   * Resets tour styling and state
   */
  reset,
  /**
   * Finishes the tour
   */
  finish,
  /**
   * Current step index
   * @type {Number}
   */
  step: run
})

</script>
<style lang="scss">
@use "../../style" as *;

.#{$prefix}disable-event {
  pointer-events: none !important;
}

.#{$prefix}tour-layer {
  transition: all .7s ease-in-out;
  position: absolute;
  box-shadow: #444444 0px 0px 1px 2px, rgba(160, 10, 255, 0.8) 0px 0px 0px 5000px;
  z-index: 1000;
  opacity: 0;
  width: 1px;
  height: 1px;
  left: 0;
  top: 0;

}

.#{$prefix}tour-clickable {
  pointer-events: auto !important;
}

.#{$prefix}tour-msg {
  transition: all 1s ease-in-out;
  color: white !important;
  position: absolute;
  width: 100%;
  z-index: 1001;
  top: 0
}
</style>
