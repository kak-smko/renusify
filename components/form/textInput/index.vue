<template>
  <r-input :active="active"
           v-model="lazyValue"
           @update:model-value="emitValue"
           @click.prevent="handleClick">
    <input :autofocus="$attrs.autofocus"
           :placeholder="$attrs.placeholder"
           :type="type"
           @focusin="active=true"
           @focusout="active=false"
           @input="emitValue"
           autocomplete="no"
           ref="input"
           v-model="lazyValue"
    />
  </r-input>
</template>
<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  /**
   * Input type (text, number, email, etc.)
   * @type {String}
   * @default 'text'
   */
  type: {
    type: String,
    default: 'text'
  },
  /**
   * The model value of the input
   * @type {String|Number}
   */
  modelValue: [String, Number]
})

const emit = defineEmits([
  /**
   * Emitted when the input value changes
   * @param {String|Number} value - The updated input value
   */
  'update:modelValue'
])

// Reactive data
const lazyValue = ref(props.modelValue)
const active = ref(false)
const input = ref(null)

// Watchers
watch(() => props.modelValue, (newValue) => {
  lazyValue.value = newValue
})

// Methods
/**
 * Focuses the input element
 */
const handleClick = () => {
  if (input.value) {
    input.value.focus()
  }
}

/**
 * Emits the updated value to the parent component
 */
const emitValue = () => {
  emit('update:modelValue', lazyValue.value)
}
</script>
