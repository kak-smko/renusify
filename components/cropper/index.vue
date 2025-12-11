<template>
  <div :class="$r.prefix + 'cropper'">
    <div v-if="show && allWPH.length > 1" class="py-1">
      <r-btn
          v-for="(item, i) in allWPH"
          :key="i"
          :class="{ 'color-one': item === currentWPH }"
          class="ma-1 "
          size="sm"
          outlined
          @click.prevent="changeWPH(item)"
      >{{ item }}
      </r-btn>
    </div>
    <div
        v-if="show"
        ref="imageBox"
        v-touch="{
        start: moveStart,
        move: setPosition,
      }"
        class="image-box"
    >
      <div ref="thumbBox" class="thumb-box">
        <div class="handle handle-nw"></div>
        <div class="handle handle-ne"></div>
        <div class="handle handle-sw"></div>
        <div class="handle handle-se"></div>
      </div>
    </div>
    <div class="action d-flex">
      <template v-if="show">
        <r-btn @click.prevent="getCrop">{{ $t("crop", "renusify") }}</r-btn>
        <r-spacer></r-spacer>
        <r-btn class="me-1" icon tile @click.prevent="zoomIn()">
          <r-icon v-html="$r.icons.plus"></r-icon>
        </r-btn>
        <r-btn icon tile @click.prevent="zoomOut()">
          <r-icon v-html="$r.icons.minus"></r-icon>
        </r-btn>
      </template>

      <input
          v-if="!show && selectImg"
          ref="file"
          accept="image/*"
          type="file"
          @change="select_img"
      />
    </div>
    <img
        v-if="showCropped && cropped"
        :height="height"
        :src="cropped"
        :width="width"
        alt="cropped"
    />
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue'

const props = defineProps({
  /**
   * Width-to-height ratio(s) for cropping
   * @type {Number|String|Array}
   * @default 1
   */
  wPH: {type: [Number, String, Array], default: 1},

  /**
   * Image source to crop
   * @type {String|Blob}
   */
  imgSrc: [String, Blob],

  /**
   * Maximum width of the cropped image
   * @type {Number}
   */
  maxWidth: Number,

  /**
   * Whether to show the cropped result
   * @type {Boolean}
   */
  showCropped: Boolean,

  /**
   * Whether to emit Blob instead of DataURL
   * @type {Boolean}
   */
  getBlob: Boolean,

  /**
   * Enables image selection
   * @type {Boolean}
   * @default true
   */
  selectImg: {type: Boolean, default: true},
})

const emit = defineEmits([
  /**
   * Emitted when image is cropped
   * @param {String|Blob} result - Cropped image as DataURL or Blob
   */
  'cropped',

  /**
   * Emitted when original image is selected
   * @param {File} file - Original image file
   */
  'original'
])

const show = ref(false)
const cropped = ref(null)
const width = ref(null)
const height = ref(null)
const state = ref({})
const ratio = ref(1)
const image = ref(new Image())
const currentWPH = ref(null)

const imageBox = ref(null)
const thumbBox = ref(null)

const allWPH = computed(() => {
  const is_array = Array.isArray(props.wPH)
  let wPH = []
  if (is_array) {
    props.wPH.forEach((item) => {
      item = item.toString().split("/")
      if (item.length === 2) {
        wPH.push(
            parseFloat((parseFloat(item[0]) / parseFloat(item[1])).toFixed(4))
        )
      } else {
        wPH.push(parseFloat(parseFloat(item[0]).toFixed(4)))
      }
    })
  } else {
    if (typeof props.wPH === "string") {
      let item = props.wPH
      item = item.split("/")
      if (item.length === 2) {
        wPH.push(
            parseFloat((parseFloat(item[0]) / parseFloat(item[1])).toFixed(4))
        )
      } else {
        wPH.push(parseFloat(parseFloat(item[0]).toFixed(4)))
      }
    } else {
      wPH.push(parseFloat(parseFloat(props.wPH).toFixed(4)))
    }
  }
  return wPH
})

// Methods
/**
 * Generates and emits the cropped image
 */
const getCrop = () => {
  cropped.value = getDataURL()
  if (props.getBlob) {
    emit("cropped", get_blob())
  } else {
    emit("cropped", cropped.value)
  }
  show.value = false
}

/**
 * Changes the width-to-height ratio
 * @param {Number} e - New width-to-height ratio
 */
const changeWPH = (e) => {
  currentWPH.value = e
  width.value = 280
  height.value = 280
  if (currentWPH.value > 1) {
    height.value = width.value / currentWPH.value
  } else {
    width.value = height.value * currentWPH.value
  }

  if (thumbBox.value) {
    thumbBox.value.style.width = width.value + "px"
    thumbBox.value.style.height = height.value + "px"
  }
}

/**
 * Starts image positioning movement
 */
const moveStart = () => {
  if (!imageBox.value) return
  let bg = imageBox.value.style.backgroundPosition.split(" ")
  state.value.x = parseInt(bg[0])
  state.value.y = parseInt(bg[1])
}

/**
 * Sets image position
 * @param {Object} e - Movement data
 * @param {Number} e.goX - X coordinate movement
 * @param {Number} e.goY - Y coordinate movement
 */
const setPosition = (e) => {
  if (!imageBox.value) return
  let bgX = e.goX + state.value.x
  let bgY = e.goY + state.value.y
  imageBox.value.style.backgroundPosition = bgX + "px " + bgY + "px"
}

/**
 * Handles image file selection
 * @param {Event} e - File input event
 */
const select_img = (e) => {
  const reader = new FileReader()
  reader.onload = function (e) {
    crop(e.target.result)
  }
  emit("original", e.target.files[0])
  reader.readAsDataURL(e.target.files[0])
}

/**
 * Generates DataURL from cropped image
 * @returns {String} - DataURL of cropped image
 */
const getDataURL = () => {
  if (!imageBox.value || !thumbBox.value) return ''

  let el = imageBox.value
  let thumb = thumbBox.value
  let widthVal = thumb.clientWidth,
      heightVal = thumb.clientHeight,
      canvas = document.createElement("canvas"),
      dim = el.style.backgroundPosition.split(" "),
      size = el.style.backgroundSize.split(" "),
      dx = parseInt(dim[0]) - el.clientWidth / 2 + widthVal / 2 + 1,
      dy = parseInt(dim[1]) - el.clientHeight / 2 + heightVal / 2 + 1,
      dw = parseInt(size[0]),
      dh = parseInt(size[1]),
      sh = parseInt(image.value.height),
      sw = parseInt(image.value.width)

  let n = 0
  if (dw >= 280) {
    n = Math.abs((sw / dw) * dx * 2)
  }
  canvas.width = sw - n
  if (props.maxWidth && canvas.width > props.maxWidth) {
    canvas.width = props.maxWidth
  }
  canvas.height = canvas.width / currentWPH.value
  while (
      parseFloat((canvas.width / canvas.height).toFixed(4)) !==
      currentWPH.value
      ) {
    canvas.width -= 1
    canvas.height = canvas.width / currentWPH.value
    if (canvas.width < 1) {
      break
    }
  }
  let context = canvas.getContext("2d")
  context.drawImage(
      image.value,
      0,
      0,
      sw,
      sh,
      (dx * canvas.width) / widthVal,
      (dy * canvas.height) / heightVal,
      (dw * canvas.width) / widthVal,
      (dh * canvas.height) / heightVal
  )
  return canvas.toDataURL("image/png")
}

/**
 * Converts DataURL to Blob
 * @returns {Blob} - Blob of cropped image
 */
const get_blob = () => {
  if (!cropped.value) return null
  let b64 = cropped.value.replace("data:image/png;base64,", "")
  let binary = atob(b64)
  let array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  let b = new Blob([new Uint8Array(array)], {
    type: "image/png",
  })
  b.name = "file.png"
  return b
}

/**
 * Zooms in the image
 */
const zoomIn = () => {
  ratio.value += 0.01
  setBackground()
}

/**
 * Zooms out the image
 */
const zoomOut = () => {
  ratio.value -= 0.01
  setBackground()
}

/**
 * Updates background image style
 */
const setBackground = () => {
  if (!imageBox.value || !image.value) return

  let el = imageBox.value
  let w = parseInt(image.value.width) * ratio.value
  let h = parseInt(image.value.height) * ratio.value

  let pw = (el.clientWidth - w) / 2
  let ph = (el.clientHeight - h) / 2

  el.setAttribute(
      "style",
      "background-image: url(" +
      image.value.src +
      "); " +
      "background-size: " +
      w +
      "px " +
      h +
      "px; " +
      "background-position: " +
      pw +
      "px " +
      ph +
      "px; " +
      "background-repeat: no-repeat"
  )
}

/**
 * Initiates cropping process
 * @param {String} img - Image DataURL
 */
const crop = (img) => {
  show.value = true
  cropped.value = null
  setTimeout(() => {
    if (!thumbBox.value) return

    let thumb = thumbBox.value
    thumb.style.width = width.value + "px"
    thumb.style.height = height.value + "px"

    image.value.onload = function () {
      ratio.value = parseInt(width.value) / image.value.width
      setBackground()
    }
    image.value.src = img
  }, 100)
}

onMounted(() => {
  width.value = 280
  height.value = 280
  currentWPH.value = allWPH.value[0]
  if (currentWPH.value > 1) {
    height.value = width.value / currentWPH.value
  } else {
    width.value = height.value * currentWPH.value
  }

  if (typeof props.imgSrc === "string") {
    crop(props.imgSrc)
  } else if (props.imgSrc) {
    const reader = new FileReader()
    reader.onload = function (e) {
      crop(e.target.result)
    }
    reader.readAsDataURL(props.imgSrc)
  }
})

watch(() => props.imgSrc, (newVal) => {
  if (newVal) {
    if (typeof newVal === "string") {
      crop(newVal)
    } else {
      const reader = new FileReader()
      reader.onload = function (e) {
        crop(e.target.result)
      }
      reader.readAsDataURL(newVal)
    }
  }
})
</script>

<style lang="scss">
@use "../../style" as *;

.#{$prefix}cropper {
  width: 300px;

  .action {
    background: var(--color-sheet-container-lowest);
    padding: 4px;
  }

  .image-box {
    position: relative;
    height: 300px;
    width: 300px;
    border: 1px solid #aaa;
    overflow: hidden;
    background: #fff no-repeat;
    cursor: move;
  }

  .thumb-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border: 2px solid rgb(14, 59, 209);
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.4);
    background: none repeat scroll 0 0 transparent;

    .handle {
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: #1976d2;
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

      &.handle-nw {
        top: -6px;
        left: -6px;
        cursor: nw-resize;
      }

      &.handle-ne {
        top: -6px;
        right: -6px;
        cursor: ne-resize;
      }

      &.handle-sw {
        bottom: -6px;
        left: -6px;
        cursor: sw-resize;
      }

      &.handle-se {
        bottom: -6px;
        right: -6px;
        cursor: se-resize;
      }
    }
  }
}
</style>
