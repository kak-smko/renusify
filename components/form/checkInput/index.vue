<template>
  <r-input :class="`${$r.prefix}check-input`" :active="active"
           :model-value="lazyValue"
           inputControlClass="pe-0"
           :msg="msg"
           :error="pass===false"
           @click.prevent="handleClick">
    <div class="check-input-container v-center">
      <input :autofocus="autofocus"
             ref="inputRef"
             :type="type"
             @focusin="active=true"
             @focusout="active=false"
             :placeholder="placeholder"
             :value="lazyValue"
             autocomplete="no"
             @input="emitValue"
      />
      <r-btn :class="{'color-success-text pe-1':pass!==null && pass!==false,'color-error-text pe-1':pass===false}"
             :loading="loading"
             class="elevation-none ms-1 btn-check" size="xs" @click.prevent="check()">
        {{ $t('check', 'renusify') }}
        <r-icon v-if="pass!==null && pass!==false" class="color-success-text ms-1" exact height="20" width="20"
                v-html="$r.icons.check"></r-icon>
        <r-icon v-if="pass===false" class="color-error-text ms-1" height="20" width="20"
                v-html="$r.icons.close"></r-icon>
      </r-btn>
    </div>
  </r-input>
</template>
<script setup>
import {ref, watch, inject, useAttrs} from 'vue'

const props = defineProps({
  /**
   * Input type attribute
   * @type {String}
   * @default 'text'
   */
  type: {
    type: String,
    default: 'text'
  },

  /**
   * Input name attribute
   * @type {String}
   * @default 'text'
   */
  name: {
    type: String,
    default: 'text'
  },

  /**
   * API endpoint URL for validation/checking
   * @type {String}
   */
  link: String,

  /**
   * The model value for the input (v-model)
   * @type {String|Number}
   */
  modelValue: [String, Number],

  /**
   * Additional headers for the API request
   * @type {Object}
   */
  headers: Object
})

const attr = useAttrs()
const placeholder = attr.placeholder
const autofocus = attr.autofocus

const emit = defineEmits([
  /**
   * Emitted when the model value changes
   * @param {String|Number} value - The new value
   */
  'update:modelValue',

  /**
   * Emitted when API validation/check completes
   * @param {Object} data - Response data from the API
   */
  'data'
])

const {$t} = inject('renusify')
const $axios = inject('axios')

const lazyValue = ref(props.modelValue)
const msg = ref(null)
const pass = ref(null)
const loading = ref(false)
const active = ref(false)

const inputRef = ref(null)

watch(() => props.modelValue, (newValue) => {
  msg.value = null
  pass.value = null
  emit('data', {})
  lazyValue.value = newValue
})

/**
 * Validates the input value against the API endpoint
 * @async
 */
const check = async () => {
  if (!props.link || !$axios) return

  loading.value = true

  try {
    const response = await $axios.post(props.link, {
      [props.name]: lazyValue.value
    }, {headers: props.headers})

    emit('data', response.data)
    msg.value = null
    pass.value = true
  } catch (error) {
    if (error.response?.data?.msg) {
      msg.value = $t ? $t(error.response.data.msg, 'renusify') : error.response.data.msg
    } else {
      msg.value = error.message || 'An error occurred'
    }

    emit('data', error.response?.data || {error: error.message})
    pass.value = false
  } finally {
    loading.value = false
  }
}

/**
 * Focuses the input element
 */
const handleClick = () => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

/**
 * Handles input change and emits the updated value
 * @param {Event} event - Input change event
 */
const emitValue = (event) => {
  lazyValue.value = event.target.value
  emit('update:modelValue', lazyValue.value)
}
</script>
<style lang="scss">
@use "../../../style" as *;

.#{$prefix}check-input {
  .check-input-container {
    display: flex;
    width: 100%;
    border-radius: inherit;
  }

  .btn-check.#{$prefix}btn {
    max-height: 30px;
    border-radius: inherit;
  }
}
</style>
