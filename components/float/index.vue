<template>
  <div :class="classes">
    <div ref="float" :class="{'in-zoom':inZoom}" class="float-container">
      <!-- Main slot for content with transformation controls. Provides scoped methods and state
       @example
       <div class="color-one" style="height: 300px;width: 400px">content</div>
       -->
      <slot :ease="ease"
            :move="moveTo"
            :pause="pause"
            :resume="resume"
            :transform="transform"
            :zoom="zoomAbs"></slot>
    </div>
  </div>
</template>
<script setup>
import {ref, computed, onMounted, onBeforeUnmount, inject} from 'vue'

const props = defineProps({
  /**
   * Adds border to the float container
   * @type {Boolean}
   */
  bordered: Boolean,

  /**
   * Disables zoom functionality
   * @type {Boolean}
   */
  disableZoom: Boolean,

  /**
   * Disables move/drag functionality
   * @type {Boolean}
   */
  disableMove: Boolean,

  /**
   * Custom transform origin point (0-1 values)
   * @type {Object}
   * @property {Number} x - X coordinate (0-1)
   * @property {Number} y - Y coordinate (0-1)
   */
  trnsfrmOrigin: Object,

  /**
   * Initial zoom level
   * @type {Number}
   * @default 1
   */
  zoom: {type: Number, default: 1},

  /**
   * Maximum zoom level
   * @type {Number}
   * @default 10
   */
  maxZoom: {
    type: Number,
    default: 10
  },

  /**
   * Minimum zoom level
   * @type {Number}
   * @default 0.1
   */
  minZoom: {
    type: Number,
    default: .1
  }
})

const emit = defineEmits([
  /**
   * Emitted when content is moved
   * @param {Array} movement - [dx, dy] movement delta
   */
  'move',

  /**
   * Emitted when zoom level changes
   * @param {Array} zoomData - [clientX, clientY, ratio] zoom parameters
   */
  'zoom'
])

const {$r} = inject('renusify')

const transform = ref({
  x: 0,
  y: 0,
  scale: props.zoom
})
const inZoom = ref(false)
const paused = ref(false)
const storedCTMResult = ref({x: 0, y: 0})
const isDirty = ref(false)
const lastTouchEndTime = ref(0)
const lastSingleFingerOffset = ref(null)
const touchInProgress = ref(false)
const multiTouch = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const pinchZoomLength = ref(0)
const frameAnimation = ref(null)
const float = ref(null)

const classes = computed(() => {
  return {
    'float-bordered': props.bordered,
    [`${$r.prefix}float`]: true
  }
})

const domElement = computed(() => float.value)

const owner = computed(() => domElement.value?.parentElement)

const transformOrigin = computed(() => {
  if (!props.trnsfrmOrigin || !isNumber(props.trnsfrmOrigin.x) || !isNumber(props.trnsfrmOrigin.y)) {
    return null
  }
  return props.trnsfrmOrigin
})

const getTransformOriginOffset = computed(() => {
  if (!owner.value || !transformOrigin.value) return {x: 0, y: 0}

  let ownerRect = owner.value.getBoundingClientRect()
  return {
    x: ownerRect.width * transformOrigin.value.x,
    y: ownerRect.height * transformOrigin.value.y
  }
})

const midPoint = computed(() => {
  if (!owner.value) return {x: 0, y: 0}

  let ownerRect = owner.value.getBoundingClientRect()
  return {
    x: ownerRect.width / 2,
    y: ownerRect.height / 2
  }
})

const builder = () => {
  if (!domElement.value || !owner.value) return

  domElement.value.scrollTop = 0
  owner.value.setAttribute('tabindex', 0)
  listenForEvents()
  zoomAbs(transform.value.x, transform.value.y, transform.value.scale)
}

const applyTransform = () => {
  if (!domElement.value) return

  isDirty.value = false
  domElement.value.style.transformOrigin = '0 0 0'
  domElement.value.style.transform = 'matrix(' +
      transform.value.scale + ', 0, 0, ' +
      transform.value.scale + ', ' +
      transform.value.x + ', ' + transform.value.y + ')'
  frameAnimation.value = 0
}

/**
 * Pauses all interaction events
 */
const pause = () => {
  releaseEvents()
  paused.value = true
}

/**
 * Resumes interaction events
 */
const resume = () => {
  if (paused.value) {
    listenForEvents()
    paused.value = false
  }
}

const listenForEvents = () => {
  if (!owner.value) return

  owner.value.addEventListener('mousedown', onMouseDown, {passive: false})
  owner.value.addEventListener('dblclick', onDoubleClick, {passive: false})
  owner.value.addEventListener('touchstart', onTouch, {passive: false})
  owner.value.addEventListener('keydown', onKeyDown, {passive: false})
  owner.value.addEventListener('wheel', onMouseWheel, {passive: false})
  makeDirty()
}

const transformToScreen = (x, y) => {
  storedCTMResult.value.x = x
  storedCTMResult.value.y = y
  return storedCTMResult.value
}

/**
 * Moves the content by specified delta
 * @param {Number} dx - X-axis movement delta
 * @param {Number} dy - Y-axis movement delta
 */
const moveTo = (dx, dy) => {
  if (props.disableMove) return
  transform.value.x += dx
  transform.value.y += dy
  emit('move', [dx, dy])
  makeDirty()
}

const makeDirty = () => {
  isDirty.value = true
  frameAnimation.value = window.requestAnimationFrame(frame)
}

/**
 * Triggers zoom ease animation
 */
const ease = () => {
  inZoom.value = true
  setTimeout(() => {
    inZoom.value = false
  }, 500)
}

/**
 * Zooms by ratio from specific point
 * @param {Number} clientX - X coordinate to zoom from
 * @param {Number} clientY - Y coordinate to zoom from
 * @param {Number} ratio - Zoom ratio
 * @param {Boolean} easeFlag - Whether to trigger ease animation
 */
const zoomByRatio = (clientX, clientY, ratio, easeFlag = false) => {
  if (props.disableZoom) return
  if (easeFlag) ease()
  if (isNaN(clientX) || isNaN(clientY) || isNaN(ratio)) {
    throw new Error('zoom requires valid numbers')
  }

  let newScale = transform.value.scale * ratio

  if (newScale < props.minZoom) {
    if (transform.value.scale === props.minZoom) return
    ratio = props.minZoom / transform.value.scale
  }
  if (newScale > props.maxZoom) {
    if (transform.value.scale === props.maxZoom) return
    ratio = props.maxZoom / transform.value.scale
  }

  let size = transformToScreen(clientX, clientY)

  transform.value.x = size.x - ratio * (size.x - transform.value.x)
  transform.value.y = size.y - ratio * (size.y - transform.value.y)

  transform.value.scale *= ratio

  emit('zoom', [clientX, clientY, ratio])

  makeDirty()
}

/**
 * Zooms to absolute level from specific point
 * @param {Number} clientX - X coordinate to zoom from
 * @param {Number} clientY - Y coordinate to zoom from
 * @param {Number} zoomLevel - Target zoom level
 */
const zoomAbs = (clientX, clientY, zoomLevel) => {
  let ratio = zoomLevel / transform.value.scale
  zoomByRatio(clientX, clientY, ratio)
}

const frame = () => {
  if (isDirty.value) applyTransform()
}

const onKeyDown = (e) => {
  let x = 0,
      y = 0,
      z = 0
  if (e.keyCode === 38) {
    y = -1 // up
  } else if (e.keyCode === 40) {
    y = 1 // down
  } else if (e.keyCode === 37) {
    x = -1 // left
  } else if (e.keyCode === 39) {
    x = 1 // right
  } else if (e.keyCode === 189 || e.keyCode === 109) {
    // DASH or SUBTRACT
    z = 1 // `-` - zoom out
  } else if (e.keyCode === 187 || e.keyCode === 107) {
    // EQUAL SIGN or ADD
    z = -1 // `=` - zoom in
  }

  if (x || y) {
    e.preventDefault()
    e.stopPropagation()

    if (!owner.value) return

    let clientRect = owner.value.getBoundingClientRect()
    let offset = Math.min(clientRect.width, clientRect.height)
    let moveSpeedRatio = 0.05
    let dx = offset * moveSpeedRatio * x
    let dy = offset * moveSpeedRatio * y

    moveTo(dx, dy)
  }

  if (z) {
    let scaleMultiplier = getScaleMultiplier(z * 100)
    let offset = transformOrigin.value ? getTransformOriginOffset.value : midPoint.value
    zoomByRatio(offset.x, offset.y, scaleMultiplier)
  }
}

const onTouch = (e) => {
  if (e.touches.length === 1) {
    return handleSingleFingerTouch(e, e.touches[0])
  } else if (e.touches.length === 2) {
    pinchZoomLength.value = getPinchZoomLength(e.touches[0], e.touches[1])
    multiTouch.value = true
    startTouchListenerIfNeeded()
  }
}

const handleSingleFingerTouch = (e) => {
  let touch = e.touches[0]
  let offset = getOffsetXY(touch)
  lastSingleFingerOffset.value = offset
  let point = transformToScreen(offset.x, offset.y)
  mouseX.value = point.x
  mouseY.value = point.y

  startTouchListenerIfNeeded()
}

const startTouchListenerIfNeeded = () => {
  if (touchInProgress.value) {
    return
  }

  touchInProgress.value = true
  document.addEventListener('touchmove', handleTouchMove, {passive: false})
  document.addEventListener('touchend', handleTouchEnd)
  document.addEventListener('touchcancel', handleTouchEnd)
}

const handleTouchMove = (e) => {
  e.stopPropagation()
  e.preventDefault()
  if (e.touches.length === 1) {
    let touch = e.touches[0]
    let offset = getOffsetXY(touch)
    let point = transformToScreen(offset.x, offset.y)

    let dx = point.x - mouseX.value
    let dy = point.y - mouseY.value

    mouseX.value = point.x
    mouseY.value = point.y
    moveTo(dx, dy)
  } else if (e.touches.length === 2) {
    multiTouch.value = true
    let t1 = e.touches[0]
    let t2 = e.touches[1]
    let currentPinchLength = getPinchZoomLength(t1, t2)

    let scaleMultiplier = 1 + (currentPinchLength / pinchZoomLength.value - 1)

    let firstTouchPoint = getOffsetXY(t1)
    let secondTouchPoint = getOffsetXY(t2)
    mouseX.value = (firstTouchPoint.x + secondTouchPoint.x) / 2
    mouseY.value = (firstTouchPoint.y + secondTouchPoint.y) / 2
    if (transformOrigin.value) {
      let offset = getTransformOriginOffset.value
      mouseX.value = offset.x
      mouseY.value = offset.y
    }

    zoomByRatio(mouseX.value, mouseY.value, scaleMultiplier)

    pinchZoomLength.value = currentPinchLength
  }
}

const handleTouchEnd = (e) => {
  if (e.touches.length > 0) {
    let offset = getOffsetXY(e.touches[0])
    let point = transformToScreen(offset.x, offset.y)
    mouseX.value = point.x
    mouseY.value = point.y
  } else {
    let now = new Date()
    if (now - lastTouchEndTime.value < 300) {
      if (transformOrigin.value) {
        let offset = getTransformOriginOffset.value
        zoomByRatio(offset.x, offset.y, transform.value.scale)
      } else {
        zoomByRatio(lastSingleFingerOffset.value.x, lastSingleFingerOffset.value.y, transform.value.scale)
      }
    }

    lastTouchEndTime.value = now
    releaseTouches()
  }
}

const getPinchZoomLength = (finger1, finger2) => {
  let dx = finger1.clientX - finger2.clientX
  let dy = finger1.clientY - finger2.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

const onDoubleClick = (e) => {
  e.preventDefault()
  e.stopPropagation()
  let offset = getOffsetXY(e)
  if (transformOrigin.value) {
    offset = getTransformOriginOffset.value
  }
  let scaleMultiplier = getScaleMultiplier(-1000)
  zoomByRatio(offset.x, offset.y, scaleMultiplier, true)
}

const onMouseDown = (e) => {
  if (touchInProgress.value) {
    e.stopPropagation()
    return false
  }
  let isLeftButton = (e.button === 1 && window.event !== null) || e.button === 0
  if (!isLeftButton) return

  let offset = getOffsetXY(e)
  let point = transformToScreen(offset.x, offset.y)
  mouseX.value = point.x
  mouseY.value = point.y

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)

  return false
}

const onMouseMove = (e) => {
  if (touchInProgress.value) return

  let offset = getOffsetXY(e)
  let point = transformToScreen(offset.x, offset.y)
  let dx = point.x - mouseX.value
  let dy = point.y - mouseY.value

  mouseX.value = point.x
  mouseY.value = point.y
  moveTo(dx, dy)
}

const onMouseUp = () => {
  releaseDocumentMouse()
}

const onMouseWheel = (e) => {
  let delta = e.deltaY
  if (e.deltaMode > 0) delta *= 100

  let scaleMultiplier = getScaleMultiplier(delta)

  if (scaleMultiplier !== 1) {
    let offset = transformOrigin.value
        ? getTransformOriginOffset.value
        : getOffsetXY(e)
    zoomByRatio(offset.x, offset.y, scaleMultiplier)
    e.preventDefault()
  }
}

const getOffsetXY = (e) => {
  let offsetX, offsetY
  if (!owner.value) return {x: 0, y: 0}

  let ownerRect = owner.value.getBoundingClientRect()
  offsetX = e.clientX - ownerRect.left
  offsetY = e.clientY - ownerRect.top

  return {x: offsetX, y: offsetY}
}

const getScaleMultiplier = (delta) => {
  let sign = Math.sign(delta)
  let deltaAdjustedSpeed = Math.min(0.25, Math.abs(delta / 128))
  return 1 - sign * deltaAdjustedSpeed
}

const isNumber = (x) => {
  return Number.isFinite(x)
}

const releaseEvents = () => {
  if (!owner.value) return

  owner.value.removeEventListener('wheel', onMouseWheel)
  owner.value.removeEventListener('mousedown', onMouseDown)
  owner.value.removeEventListener('keydown', onKeyDown)
  owner.value.removeEventListener('dblclick', onDoubleClick)
  owner.value.removeEventListener('touchstart', onTouch)

  if (frameAnimation.value) {
    window.cancelAnimationFrame(frameAnimation.value)
    frameAnimation.value = 0
  }

  releaseDocumentMouse()
  releaseTouches()
}

const releaseDocumentMouse = () => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

const releaseTouches = () => {
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
  document.removeEventListener('touchcancel', handleTouchEnd)
  multiTouch.value = false
  touchInProgress.value = false
}

onMounted(() => {
  builder()
})

onBeforeUnmount(() => {
  releaseEvents()
})

defineExpose({
  /** Pauses all interaction events */
  pause,
  /** Resumes interaction events */
  resume,
  /**
   * Moves the content by specified delta
   * @param {Number} dx - X-axis movement delta
   * @param {Number} dy - Y-axis movement delta
   */
  moveTo,
  /**
   * Zooms by ratio from specific point
   * @param {Number} clientX - X coordinate to zoom from
   * @param {Number} clientY - Y coordinate to zoom from
   * @param {Number} ratio - Zoom ratio
   * @param {Boolean} easeFlag - Whether to trigger ease animation
   */
  zoomByRatio
})
</script>
<style lang="scss">
@use "sass:map";
@use "../../style" as *;


.#{$prefix}float {
  width: 100%;
  max-width: 100%;
  max-height: 100vh;
  height: 100%;
  overflow: hidden;
  outline: none;
  border-radius: map.get($borders, 'sm');

  &.float-bordered {
    border: 1px solid var(--color-border);
  }

  .float-container {
    width: 100%;
    height: 100%;

    &.in-zoom {
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>