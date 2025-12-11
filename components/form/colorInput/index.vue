<template>
  <r-input :model-value="modelValue"
           @click.prevent="open=true"
           :class="`${$r.prefix}color-picker`">
    <div :style="{'background-color':modelValue}" class="shower"></div>
    <r-modal v-model="open" class="color-picker-modal" maxWidth="260px" no-close-btn>
      <picker :color="modelValue" @changeColor="emitColor"></picker>
      <div class="d-flex h-space-between">
        <r-btn class="color-success flex-grow-1 me-1" outlined @click.prevent="close()">
          <r-icon v-html="$r.icons.check" exact></r-icon>
        </r-btn>
        <r-btn class=" color-error flex-grow-1 ms-1" exact outlined @click.prevent="clear()">
          <r-icon v-html="$r.icons.delete"></r-icon>
        </r-btn>
      </div>
    </r-modal>
  </r-input>
</template>
<script setup>
import {ref} from 'vue'
import Picker from "./picker.vue";

const props = defineProps({
  /**
   * The model value for the color picker (v-model)
   * @type {String}
   */
  modelValue: String,

  /**
   * Color format to output
   * @type {String}
   * @default 'rgba'
   * @values rgba, hex
   */
  format: {
    type: String,
    default: 'rgba'
  }
})

const emit = defineEmits([
  /**
   * Emitted when the color value changes
   * @param {String} color - The new color value
   */
  'update:modelValue',

  /**
   * Emitted when the color picker is closed
   * @param {Boolean} true - Indicates the picker is closed
   */
  'close'
])

const open = ref(false)

/**
 * Clears the selected color and closes the picker
 */
function clear() {
  open.value = false
  emit('update:modelValue', null)
  emit('close', true)
}

/**
 * Closes the color picker
 */
function close() {
  open.value = false
  emit('close', true)
}

/**
 * Emits the selected color in the specified format
 * @param {Object} e - Color picker event object
 * @param {String} e.hex - Hex color value
 * @param {String} e.rgba - RGBA color value
 */
function emitColor(e) {
  let result = e.hex
  if (props.format === 'rgba') {
    result = e.rgba
  }
  emit('update:modelValue', result)
}
</script>
<style lang="scss">
@use "../../../style" as *;

.#{$prefix}color-picker {
  .shower {
    width: 100%;
    height: 30px;
  }

  .color-picker-modal {
    background-color: var(--color-sheet-container-high);
    color: var(--color-on-sheet);
  }
}
</style>
