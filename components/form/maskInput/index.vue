<template>
  <r-input :error="error?true:false" ltr :rules="required?['required']:[]" :msg="error?error:undefined"
           :modelValue="lazyVal" :active="active">
    <input
        v-model="lazyVal"
        :autofocus="autofocus"
        :placeholder="placeholder"
        @complete="onComplete"
        @accept="onAccept"
        @backspace="onBackspace"
        autocomplete="no"
        @paste.prevent="onPaste"
        @focusin="active=true"
        @focusout="active=false"
        v-mask="mask"
    />

  </r-input>
</template>

<script setup>
import {ref, computed, watch, inject, nextTick, useAttrs} from 'vue'

const attr = useAttrs()
const placeholder = attr.placeholder
const autofocus = attr.autofocus

const props = defineProps({
  /**
   * The input's model value
   * @type {String}
   */
  modelValue: String,
  /**
   * Mask pattern for input formatting
   * @type {String}
   * @default ''
   *
   * Mask characters:
   * - 'N': Numbers only (0-9)
   * - 'A': Letters only (a-z, A-Z)
   * - 'B': Alphanumeric (a-z, A-Z, 0-9)
   * - 'X': Any character
   * - Other characters: Static mask characters
   *
   * Example: "NN-NN-AAAA" formats as "12-34-ABCD"
   */
  mask: {
    default: '',
    type: String
  },
  /**
   * Whether the input is required
   * @type {Boolean}
   * @default false
   */
  required: {
    default: false,
    type: Boolean
  },
  /**
   * Whether to emit masked value instead of unmasked
   * @type {Boolean}
   * @default false
   *
   * When true, emits value with mask characters (e.g., "12-34-ABCD")
   * When false, emits only the unmasked characters (e.g., "1234ABCD")
   */
  maskedVal: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits([
  /**
   * Emitted when the input value changes
   * @param {String} value - The updated value (masked or unmasked based on maskedVal prop)
   */
  'update:modelValue',
  /**
   * Emitted when the mask is completely filled
   * @param {Boolean} isComplete - Whether the mask is fully filled
   */
  'complete'
])

const {$t} = inject('renusify')

// Reactive data
const lazyVal = ref(props.modelValue ? buildMask(props.modelValue, props.mask) : null)
const isUpdating = ref(false)
const active = ref(false)
const complete = ref(false)

// Computed properties
/**
 * Error message for required validation
 * @returns {String|Boolean} Error message if required and incomplete, otherwise false
 */
const error = computed(() => {
  if (props.required && !complete.value) {
    return lazyVal.value !== null ? $t('required_error', 'renusify') : false
  }
  return false
})

// Methods
/**
 * Handles paste event and applies mask to pasted content
 * @param {ClipboardEvent} e - The paste event
 */
const onPaste = (e) => {
  e.preventDefault()

  let pastedText = e.clipboardData.getData('Text')
      .replace(/[\r\n]/g, '') // Remove all line breaks
      .trim()

  lazyVal.value = buildMask(pastedText, props.mask)
}

/**
 * Applies mask pattern to input data
 * @param {String} data - The input data to mask
 * @param {String} mask - The mask pattern
 * @returns {String} Masked string
 */
const buildMask = (data, mask) => {
  if (props.maskedVal || typeof data !== 'string' || data === '') {
    return data
  }

  let dataIndex = 0
  let dataOutput = ''
  const maskLength = mask.length

  for (let i = 0; i < maskLength; i++) {
    const dataChar = data.charAt(dataIndex)
    const maskChar = mask.charAt(i)

    switch (maskChar) {
      case 'N': // Numbers only
        if (/[0-9]/.test(dataChar)) {
          dataOutput += dataChar
        }
        dataIndex++
        break

      case 'A': // Letters only
        if (/[a-z]/i.test(dataChar)) {
          dataOutput += dataChar
        }
        dataIndex++
        break

      case 'B': // Alphanumeric
        if (/[a-z0-9]/i.test(dataChar)) {
          dataOutput += dataChar
        }
        dataIndex++
        break

      case 'X': // Any character
        dataOutput += dataChar
        dataIndex++
        break

      default: // Static mask character
        dataOutput += maskChar
        break
    }
  }

  return dataOutput
}

/**
 * Handles input acceptance event
 * @param {CustomEvent} event - The acceptance event
 */
const onAccept = (event) => {
  const detail = event.detail
  complete.value = false

  const valueToEmit = props.maskedVal ? detail.masked : detail.unMasked
  emitValue(valueToEmit)
}

/**
 * Handles backspace key event
 */
const onBackspace = () => {
  complete.value = false
}

/**
 * Handles mask completion event
 * @param {CustomEvent} event - The completion event
 */
const onComplete = (event) => {
  const detail = event.detail
  complete.value = true

  const valueToEmit = props.maskedVal ? detail.masked : detail.unMasked
  emitValue(valueToEmit)
}

/**
 * Emits the updated value
 * @param {String} value - The value to emit
 */
const emitValue = (value) => {
  if (isUpdating.value) return

  isUpdating.value = true
  emit('update:modelValue', value)
  emit('complete', complete.value)
  nextTick(() => {
    isUpdating.value = false
  })
}

/**
 * Extracts unmasked characters from masked value
 * @param {String} maskedValue - The masked string
 * @param {String} mask - The mask pattern
 * @returns {String} Unmasked string
 */
const extractUnmasked = (maskedValue, mask) => {
  if (!maskedValue || !mask) return maskedValue

  let result = ''
  for (let i = 0; i < maskedValue.length; i++) {
    const maskChar = mask.charAt(i)
    const valueChar = maskedValue.charAt(i)

    if (maskChar === 'N' || maskChar === 'A' || maskChar === 'B' || maskChar === 'X') {
      result += valueChar
    }
  }

  return result
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (isUpdating.value) return
  lazyVal.value = buildMask(newValue, props.mask)
})

watch(lazyVal, (newValue) => {
  if (isUpdating.value) return
  if (newValue !== null && newValue !== undefined) {
    const valueToEmit = props.maskedVal ? newValue : extractUnmasked(newValue, props.mask)
    emitValue(valueToEmit)
  }
}, {immediate: true})
</script>
