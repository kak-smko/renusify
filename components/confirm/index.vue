<template>
  <r-modal :model-value="modelValue" no-close-btn>
    <r-container class="container-fluid">
      <r-row>
        <r-col class="col-12 text-center">
          <h2 class="title-1">
            {{ title || $t('confirm_title', 'renusify') }}
          </h2>
          <r-divider class="my-3 color-warning"></r-divider>
        </r-col>
        <r-col class="col-12">
          {{ text || $t('confirm_body', 'renusify') }}
        </r-col>
        <r-col class="col-12 mb-2 pt-0" v-if="hard">
          <r-form v-model="valid">
            <r-text-input :label="$t(['confirm_code',[inputKey]],'renusify')"
                          :rules="['required','match:'+inputKey]"
                          v-model.number="inputVal"></r-text-input>
          </r-form>
        </r-col>
      </r-row>
      <r-row class="h-end no-gutters">
        <r-btn :loading="this.loading"
               @click.stop="cancel"
               class="color-error-text mx-1"
               outlined
               rounded
               v-if="!this.loading">
          {{ cancelText || $t('cancel', 'renusify') }}
        </r-btn>
        <r-btn :disabled="hard&&!valid"
               :loading="this.loading"
               @click.stop="confirm"
               class="color-success-text"
               outlined
               rounded>{{ confirmText || $t('accept', 'renusify') }}
        </r-btn>
      </r-row>
    </r-container>
  </r-modal>
</template>

<script setup>
import {ref, watch, inject} from 'vue'

const props = defineProps({
  /**
   * Dialog title text
   * @type {String}
   */
  title: String,

  /**
   * Dialog message text
   * @type {String}
   */
  text: String,

  /**
   * Cancel button text
   * @type {String}
   */
  cancelText: String,

  /**
   * Confirm button text
   * @type {String}
   */
  confirmText: String,

  /**
   * Controls dialog visibility
   * @type {Boolean}
   */
  modelValue: Boolean,

  /**
   * Enables hard confirmation requiring user to type a verification code
   * @type {Boolean}
   */
  hard: Boolean
})

const emit = defineEmits([
  /**
   * Emitted when user confirms the dialog
   */
  'accept',

  /**
   * Emitted when user cancels the dialog
   */
  'cancel',

  /**
   * Emitted when dialog visibility should be updated
   * @param {Boolean} value - New visibility state
   */
  'update:modelValue'
])

const $helper = inject('renusify').$helper

const valid = ref(false)
const inputVal = ref(null)
const inputKey = ref(null)
const loading = ref(false)

/**
 * Resets dialog state to initial values
 */
const resetState = () => {
  inputKey.value = $helper?.randomInt(10, 99) || Math.floor(Math.random() * 90) + 10
  inputVal.value = null
  loading.value = false
}

/**
 * Handles confirmation action
 */
const confirm = () => {
  if (props.hard && (inputKey.value !== inputVal.value)) {
    cancel()
  } else {
    loading.value = true
    emit('accept')
  }
}

/**
 * Handles cancellation action
 */
const cancel = () => {
  loading.value = true
  emit('cancel')
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    resetState()
  }
})

if (props.modelValue) {
  resetState()
}
</script>
