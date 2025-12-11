<template>
  <form :class="`${$r.prefix}form`" @submit.prevent="submit">
    <!-- Default slot for form content. Provides form context to child input components through dependency injection.
     @example
     <r-text-input label="name" :rules="[`required`]" ></r-text-input>
     <r-text-input label="last name" :rules="[`required`]" ></r-text-input>
     <r-number-input label="age" :rules="[`required`]" ></r-number-input>
     -->
    <slot></slot>
  </form>
</template>

<script setup>
import {ref, watch, provide, reactive} from 'vue'

const props = defineProps({
  /**
   * The form's model value indicating whether it's valid
   * @model
   * @type {Boolean}
   * @default false
   */
  modelValue: Boolean
})

const emit = defineEmits([
  /**
   * Emitted when form validity changes
   * @param {Boolean} isValid - Whether the form is valid
   */
  'update:modelValue',

  /**
   * Emitted when form is submitted
   * @param {Boolean} true - Form submission
   */
  'submit'])

/**
 * Array of registered input components
 * @type {Ref<Array<Object>>}
 */
const inputs = ref([])

/**
 * Array of watchers for input validation states
 * @type {Ref<Array<Object>>}
 */
const watchers = ref([])

/**
 * Reactive error bag containing validation errors
 * @type {Object}
 * @property {Boolean} [inputUid] - Error state for each input by UID
 */
const errorBag = reactive({})

// Watch for changes in errorBag to emit validity updates
watch(
    () => errorBag,
    (val) => {
      const errors = Object.values(val).includes(true)
      emit('update:modelValue', !errors)
    },
    {deep: true, immediate: true}
)

/**
 * Form submission handler
 * @method submit
 * @fires RForm#submit
 */
const submit = () => {
  emit('submit', true)
}

/**
 * Creates a watcher for an input's error state
 * @method watchInput
 * @param {Object} input - Input component instance
 * @param {String} input.uid - Unique identifier for the input
 * @param {Ref<Boolean>} input.hasError - Reactive error state
 * @returns {Object} Watcher object with UID and cleanup functions
 * @private
 */
const watchInput = (input) => {
  const watcher = (input) => {
    return watch(input.hasError, val => {
      errorBag[input.uid] = val
    }, {
      immediate: true
    })
  }

  const watchersObj = {
    uid: input.uid,
    valid: () => {
    },
    shouldValidate: () => {
    }
  }

  watchersObj.valid = watcher(input)

  return watchersObj
}

/**
 * Validates all registered form inputs
 * @method validate
 * @returns {Boolean} True if all inputs are valid
 */
const validate = () => {
  return inputs.value.filter(input => !input.validate(true)).length === 0
}

/**
 * Resets all registered form inputs to their initial state
 * @method reset
 */
const reset = () => {
  inputs.value.forEach(input => input.reset())
}

/**
 * Resets validation state for all registered inputs
 * @method resetValidation
 */
const resetValidation = () => {
  inputs.value.forEach(input => input.resetValidation())
}

/**
 * Registers an input component with the form
 * @method register
 * @param {Object} input - Input component instance
 * @private
 */
const register = (input) => {
  inputs.value.push(input)
  watchers.value.push(watchInput(input))
}

/**
 * Unregisters an input component from the form
 * @method unregister
 * @param {Object} input - Input component instance
 * @private
 */
const unregister = (input) => {
  const found = inputs.value.find(i => i.uid === input.uid)
  if (!found) return
  const unwatch = watchers.value.find(i => i.uid === found.uid)

  if (unwatch) {
    unwatch.valid()
    unwatch.shouldValidate()
  }

  watchers.value = watchers.value.filter(i => i.uid !== found.uid)
  inputs.value = inputs.value.filter(i => i.uid !== found.uid)
  delete errorBag[found.uid]
}

/**
 * Provides form context to child components
 * @typedef {Object} FormContext
 * @property {Function} register - Function to register input components
 * @property {Function} unregister - Function to unregister input components
 */
provide('form', {
  register,
  unregister
})

defineExpose({
  /**
   * Form error bag containing validation errors
   * @type {Object}
   */
  errorBag,

  /**
   * Validates all form inputs
   * @method validate
   * @returns {Boolean} True if all inputs are valid
   */
  validate,

  /**
   * Resets all form inputs to their initial state
   * @method reset
   */
  reset,

  /**
   * Resets validation state for all inputs
   * @method resetValidation
   */
  resetValidation,

  /**
   * Submits the form programmatically
   * @method submit
   */
  submit
})
</script>
