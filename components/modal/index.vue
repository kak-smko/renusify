<template>
  <teleport v-if="mounted" :to="`.${$r.prefix}app`">
    <div
        v-if="modelValue && !noOverlay"
        :class="`${$r.prefix}modal-overlay`"
    ></div>

    <transition :name="computedAnimation">
      <div
          v-if="modelValue"
          :class="modalClasses"
          v-bind="$attrs"
          @click.self="close()"
      >
        <div
            :class="containerClasses"
            :style="containerStyles"
            class="modal-container"
        >
          <div class="modal-btn text-end">
            <r-btn
                v-if="!noCloseBtn"
                class="color-error-text"
                fab
                size="sm"
                text
                @click.prevent="close(true)"
            >
              <r-icon v-html="$r.icons.close"></r-icon>
            </r-btn>
          </div>

          <div class="modal-content">
            <!-- Default slot for modal content
             @example
             <div class="display-3 pa-12">Title</div>
             -->
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import {computed, inject, onMounted, onUnmounted, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const props = defineProps({
  /**
   * Controls the visibility of the modal
   * @type {Boolean}
   * @required
   */
  modelValue: {
    type: Boolean,
    required: true
  },
  /**
   * Position of the modal on the screen
   * @type {String}
   * @default 'center'
   * @values 'center', 'bottom', 'start', 'end', 'top'
   */
  position: {
    type: String,
    default: 'center',
    validator: (value) => ['center', 'bottom', 'start', 'end', 'top'].includes(value)
  },
  /**
   * Hides the overlay/backdrop behind the modal
   * @type {Boolean}
   */
  noOverlay: Boolean,
  /**
   * Makes the modal take full width of the screen
   * @type {Boolean}
   */
  fullWidth: Boolean,
  /**
   * Makes the modal take full height of the screen
   * @type {Boolean}
   */
  fullHeight: Boolean,
  /**
   * Maximum width of the modal container
   * @type {String}
   * @default null
   */
  maxWidth: {
    type: String,
    default: null
  },
  /**
   * Maximum height of the modal container
   * @type {String}
   * @default null
   */
  maxHeight: {
    type: String,
    default: null
  },
  /**
   * Applies minimum width styling to the modal
   * @type {Boolean}
   * @default true
   */
  minWidth: {
    type: Boolean,
    default: true
  },
  /**
   * Prevents closing the modal by clicking overlay or pressing escape
   * @type {Boolean}
   */
  noClosable: Boolean,
  /**
   * Hides the close button in the modal header
   * @type {Boolean}
   */
  noCloseBtn: Boolean,
  /**
   * Route hash value for URL-based modal state management
   * @type {String}
   */
  routeHistory: String,
  /**
   * Custom CSS animation name for modal transitions
   * @type {String}
   */
  animation: String
})

const emit = defineEmits([
  /**
   * Emitted when modal visibility changes
   * @param {Boolean} isOpen - Whether the modal is open
   */
  'update:modelValue'
])

const {$r} = inject('renusify')

const route = useRoute()
const router = useRouter()

const mounted = ref(false)
const runAnimation = ref(false)

const computedAnimation = computed(() => {
  if (props.animation) return props.animation

  switch (props.position) {
    case 'bottom':
      return 'slide-up'
    case 'top':
      return 'slide-down'
    case 'start':
      return 'slide-end'
    case 'end':
      return 'slide-start'
    default:
      return 'scale'
  }
})

const modalClasses = computed(() => {
  return [
    `${$r.prefix}modal`,
    `modal-${props.position}`,
    {
      'animate-modal-vibrate': runAnimation.value
    }
  ]
})

const containerClasses = computed(() => {
  return [
    {
      'modal-full-width': props.fullWidth,
      'modal-full-height': props.fullHeight,
      'modal-mini': props.minWidth,
      [`modal-${props.position}`]: props.position !== 'center'
    }
  ]
})

const containerStyles = computed(() => {
  const styles = {}
  if (props.maxWidth) styles['max-width'] = props.maxWidth
  if (props.maxHeight) styles['max-height'] = props.maxHeight
  return styles
})

const initFromRoute = () => {
  if (!props.routeHistory) return

  const hashValues = route.hash.replace('#', '').split('&')
  if (hashValues.includes(props.routeHistory)) {
    emit('update:modelValue', true)
  }
}

const handleRouteChange = (newRoute) => {
  if (!props.routeHistory) return

  const hashValues = newRoute.hash.replace('#', '').split('&')
  emit('update:modelValue', hashValues.includes(props.routeHistory))
}

const handleModelValueChange = (isOpen) => {
  if (isOpen) {
    document.documentElement.style.overflow = 'hidden'
    handleOpenState()
  } else {
    document.documentElement.style.overflow = null
  }
}

const handleOpenState = () => {
  if (!props.routeHistory) return

  const hashValues = route.hash.replace('#', '').split('&')
  if (!hashValues.includes(props.routeHistory)) {
    const newHash = route.hash
        ? `${route.hash}&${props.routeHistory}`
        : `#${props.routeHistory}`

    router.push({
      path: route.fullPath,
      hash: newHash
    })
  }
}

/**
 * Closes the modal
 * @param {Boolean} force - Force close even when noClosable is true
 */
const close = (force = false) => {
  if (props.noClosable && !force) {
    runAnimation.value = true
    setTimeout(() => runAnimation.value = false, 300)
    return
  }

  if (props.routeHistory) {
    handleRouteClose()
  }

  emit('update:modelValue', false)
}

const handleRouteClose = () => {
  if (history.state.back) {
    router.back()
    return
  }

  let hashValues = route.hash.replace('#', '').split('&')
  hashValues = hashValues.filter(val => val !== props.routeHistory)

  const newHash = hashValues.length
      ? `#${hashValues.join('&')}`
      : ''

  router.replace({
    path: route.fullPath,
    hash: newHash
  })
}

onMounted(() => {
  initFromRoute()
  setTimeout(() => {
    mounted.value = true
  }, 10)
})

onUnmounted(() => {
  document.documentElement.style.overflow = null
})

watch(() => route, handleRouteChange, {immediate: true})

watch(() => props.modelValue, handleModelValueChange, {immediate: true})

defineOptions({
  inheritAttrs: false
})

</script>

<style lang="scss">
@use "sass:map";
@use "../../style" as *;


.#{$prefix}modal-overlay {
  position: fixed;
  inset: 0;
  z-index: map.get($z-index, 'important');
  background-color: var(--color-overlay);
  backdrop-filter: blur(3px) grayscale(30%);
}

.#{$prefix}modal {
  position: fixed;
  inset: 0;
  display: flex;
  z-index: map.get($z-index, 'important');
  outline: none;

  // Position variants
  &.modal-center {
    align-items: center;
    justify-content: center;
  }

  &.modal-bottom {
    align-items: flex-end;
    justify-content: center;
  }

  &.modal-top {
    align-items: flex-start;
    justify-content: center;
  }

  &.modal-start {
    align-items: center;
    justify-content: flex-start;
  }

  &.modal-end {
    align-items: center;
    justify-content: flex-end;
  }

  .modal-btn {
    width: 100%;
    position: relative;

    .#{$prefix}btn {
      position: absolute;
      bottom: -40px;
      z-index: map.get($z-index, 'important') + 1;

      @include rtl() {
        left: 5px;
      }

      @include ltr() {
        right: 5px;
      }
    }
  }

  .modal-container {
    width: 95%;
    max-width: 100vw;
    max-height: 90vh;
    z-index: map.get($z-index, 'important');
    background-color: var(--color-sheet-container-low);
    color: var(--color-on-sheet);
    border: 1px solid var(--color-sheet-container);
    border-radius: map.get($borders, 'md');
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &.modal-bottom,
    &.modal-top {
      width: 100%;
      border-radius: map.get($borders, 'md') map.get($borders, 'md') 0 0;

      &:not(.modal-full-width) {
        max-width: map.get($container-max-widths, 'lg');
      }
    }

    &.modal-start,
    &.modal-end {
      height: 100%;
      max-height: 100vh;
      border-radius: 0 map.get($borders, 'md') map.get($borders, 'md') 0;

      &:not(.modal-full-height) {
        max-height: 90vh;
      }
    }

    &.modal-start {
      border-radius: map.get($borders, 'md') 0 0 map.get($borders, 'md');
    }
  }

  .modal-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @include media-breakpoint-up('md') {
    .modal-container:not(.modal-full-width):not(.modal-mini) {
      width: 75%;
      max-width: 75vw;
    }
  }

  .modal-mini {
    max-width: 500px;
  }

  .modal-full-width {
    width: 100%;
    max-width: 100vw;
  }

  .modal-full-height {
    height: 100%;
    max-height: 100vh;
  }
}

// Animations
.animate-modal-vibrate {
  animation: animate-modal-vibrate 0.15s map.get($transition, 'fast-in-fast-out');

  @keyframes animate-modal-vibrate {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
    }
  }
}
</style>