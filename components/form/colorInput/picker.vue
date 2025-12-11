<template>
  <div
      class="color-box"
  >
    <div class="color-set">
      <Saturation
          ref="saturationRef"
          :hsv="{h:h,s:s,v:v}"
          :color="rgbaString"
          :size="200"
          @selectSaturation="selectSaturation"
      />
      <Hue
          ref="hueRef"
          :hsv="{h:h,s:s,v:v}"
          :width="15"
          :height="200"
          @selectHue="selectHue"
      />
      <Alpha
          ref="alphaRef"
          :color="rgbaString"
          :rgba="rgba"
          :width="15"
          :height="200"
          @selectAlpha="selectAlpha"
      />
    </div>
    <div class="color-show">
      <Preview
          :color="rgbaString"
          :width="238"
          :height="28"
      />
    </div>
    <div class="color-input">
    <span class="name">
      HEX
    </span>
      <input :value="hexString" @input="inputHex" class="value"/>
    </div>
    <div class="color-input">
    <span class="name">
      RGBA
    </span>
      <input :value="rgbaString" @input="inputRgba" class="value"/>
    </div>

    <slot></slot>
  </div>
</template>
<script setup>
import {nextTick, ref, computed, watch} from 'vue'
import {rgb2hex, setColorValue} from './useColor.js'
import Saturation from "./Saturation.vue";
import Hue from "./Hue.vue";
import Alpha from "./Alpha.vue";
import Preview from "./Preview.vue";

const props = defineProps({
  color: {
    type: String,
    default: '#2F1DCC',
  }
})
const emit = defineEmits(['changeColor'])
const r = ref(0)
const g = ref(0)
const b = ref(0)
const a = ref(1)
const h = ref(0)
const s = ref(0)
const v = ref(0)

const saturationRef = ref(null)
const hueRef = ref(null)
const alphaRef = ref(null)

const rgba = computed(() => ({
  r: r.value,
  g: g.value,
  b: b.value,
  a: a.value
}))
const rgbaString = computed(() =>
    `rgba(${r.value}, ${g.value}, ${b.value}, ${a.value})`
)

const hexString = computed(() =>
    rgb2hex(rgba.value, true)
)

watch(() => props.color, (newColor) => {
  setColorValue(newColor, {
    r, g, b, a, h, s, v
  })
})

watch(rgba, () => {
  emit('changeColor', {
    rgba: rgbaString.value,
    hex: hexString.value,
  })
})

function selectSaturation(color) {
  setColorValue(color, {
    r, g, b, a, h, s, v
  })
}

function selectHue(color) {
  setColorValue(color, {
    r, g, b, a, h, s, v
  })
  nextTick(() => {

    saturationRef.value.renderColor()

    saturationRef.value.renderSlide()
  })
}

function selectAlpha(e) {
  a.value = e
}

function inputHex(color) {
  const value = color.target.value
  setColorValue(value, {
    r, g, b, a, h, s, v
  })
  nextTick(() => {

    saturationRef.value.renderColor()

    saturationRef.value.renderSlide()

    hueRef.value.renderSlide()
  })
}

function inputRgba(color) {
  const value = color.target.value
  setColorValue(value, {
    r, g, b, a, h, s, v
  })
  nextTick(() => {
    saturationRef.value.renderColor()

    saturationRef.value.renderSlide()

    hueRef.value.renderSlide()
  })
}

setColorValue(props.color, {
  r, g, b, a, h, s, v
})
</script>

<style lang="scss">
@use "sass:map";
@use "../../../style" as *;


.color-box {
  padding: 10px;
  border-radius: map.get($borders, 'sm');
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
  z-index: 1;

  canvas {
    vertical-align: top;
  }

  .color-set {
    display: flex;
  }

  .color-show {
    margin-top: 8px;
    display: flex;
  }

  .color-input {
    display: flex;
    margin-top: 8px;
    font-size: 12px;

    .name {
      width: 60px;
      height: 30px;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .value {
      flex: 1;
      height: 30px;
      min-width: 100px;
      padding: 0 12px;
      border: 0;
      box-sizing: border-box;
      text-align: left;
      direction: ltr;
    }


    .name {
      background: var(--color-sheet-container)
    }

    .value {
      background: var(--color-sheet)
    }
  }
}


</style>
