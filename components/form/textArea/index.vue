<template>
  <r-input :active="active"
           v-model="lazyValue"
           @click.stop="handleClick()"
           @update:model-value="emit"
           :class="[`${$r.prefix}text-area`]"
  >
    <template v-slot="{uid}">
      <textarea @focusin="active=true"
                @focusout="active=false"
                ref="inputRef"
                :autofocus="autofocus"
                :class="{'no-resize':noResize}"
                :rows="rows"
                autocomplete="no"
                v-model="lazyValue"
                :placeholder="placeholder"
                @input="emitValue"
                :id="uid"
      ></textarea>
    </template>
  </r-input>
</template>
<script setup>
import {ref, watch, nextTick, useAttrs} from 'vue'

const attr = useAttrs()
const placeholder = attr.placeholder
const autofocus = attr.autofocus

const props = defineProps({
  /**
   * Disables textarea resizing
   * @type {Boolean}
   */
  noResize: Boolean,
  /**
   * The model value of the textarea
   * @type {String|Number}
   */
  modelValue: [String, Number],
  /**
   * Number of visible text rows
   * @type {String|Number}
   * @default '7'
   */
  rows: {
    type: [String, Number],
    default: '7'
  }
})

const emit = defineEmits([
  /**
   * Emitted when the textarea value changes
   * @param {String|Number} value - The updated value
   */
  'update:modelValue'
])

// Reactive data
const lazyValue = ref(props.modelValue)
const active = ref(false)
const inputRef = ref(null)

// Watchers
watch(() => props.modelValue, (newValue) => {
  lazyValue.value = newValue
})

// Methods
/**
 * Focuses the textarea input
 */
const handleClick = async () => {
  await nextTick()
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

/**
 * Emits the updated value to the parent component
 */
const emitValue = () => {
  emit('update:modelValue', lazyValue.value)
}
</script>
<style lang="scss">
@use "../../../style" as *;

.#{$prefix}text-area {
  .no-resize {
    resize: none;
  }

  .input-control {
    height: auto;
  }
}
</style>