<template>
  <r-text-input
      :class="color"
      @update:modelValue="check"
      :model-value="modelValue"
      :error="error"
      :msg="msg"
  ></r-text-input>
</template>

<script setup>
import {ref, watch, inject} from 'vue'

const props = defineProps({
  /**
   * API endpoint URL for uniqueness validation
   * @type {String}
   * @required
   */
  link: {
    type: String,
    required: true
  },
  /**
   * The model value to validate for uniqueness
   * @type {String}
   * @default null
   */
  modelValue: {
    default: null,
    type: String
  },
  /**
   * Additional headers for the validation request
   * @type {Object}
   */
  headers: Object
})

const emit = defineEmits([
  /**
   * Emitted when the value changes
   * @param {String} value - The updated value
   */
  'update:modelValue'
])

// Inject dependencies
const $axios = inject('axios')
const $t = inject('renusify').$t

// Reactive data
const item = ref(props.modelValue)
const color = ref(null)
const msg = ref(null)
const error = ref(false)
const isLoading = ref(false)

// Methods
/**
 * Validates the input value for uniqueness against the API
 * @param {String} value - The value to validate
 */
const check = (value) => {
  item.value = value
  error.value = true
  color.value = 'color-error-text'

  emit('update:modelValue', item.value)

  if (item.value) {
    isLoading.value = true

    $axios.post(props.link, {
      'unique_name': item.value
    }, {headers: props.headers})
        .then((res) => {
          if (res.data) {
            color.value = 'color-success-text'
            error.value = false
            msg.value = null
          } else {
            color.value = 'color-error-text'
            error.value = true
            msg.value = $t('validation.unique')
          }
        })
        .catch((errorResponse) => {
          color.value = 'color-error-text'
          error.value = true

          const errorMsg = errorResponse?.response?.data?.msg ||
              'Validation failed'

          msg.value = $t(errorMsg)

          console.error('Unique validation error:', errorResponse)
        })
        .finally(() => {
          isLoading.value = false
        })
  } else {
    error.value = false
    color.value = ''
    msg.value = null
  }
}

// Initialize validation if modelValue exists
if (props.modelValue) {
  check(props.modelValue)
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue !== item.value) {
    item.value = newValue
    check(newValue)
  }
})
</script>
