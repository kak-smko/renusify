<template>
  <r-input
      :active="active"
      :class="`${$r.prefix}timepicker`"
      :model-value="lazyValue"
      @click.prevent="show_modal = true"
  >
    <input
        ref="inputRef"
        v-model="lazyValue"
        :placeholder="$attrs.placeholder"
        autocomplete="no"
        readonly
        type="text"
        @focusin="active = true"
        @focusout="active = false"
    />
    <r-modal
        class="modal-timepicker"
        v-model="show_modal"
        no-close-btn
        :no-overlay="noOverlay"
    >
      <div class="pt-3 pb-1">
        <timepicker
            class="mb-2 mx-3"
            :disableTime="disableTime"
            :is24-hour="is24Hour"
            :withSec="withSec"
            v-model="lazyValue"
        ></timepicker>
        <div class="my-3 d-flex h-space-between px-3">
          <r-btn
              class="color-success-text"
              outlined
              @click.prevent="show_modal = false,emitValue()"
          >
            {{ $t('accept', 'renusify') }}
          </r-btn
          >
          <r-btn
              class="color-warning-text"
              outlined
              @click.prevent="(show_modal = false), (lazyValue = null),emitValue()"
          >
            {{ $t('cancel', 'renusify') }}
          </r-btn
          >
        </div>
      </div>
    </r-modal>
  </r-input>

</template>

<script setup>
import {ref, watch} from 'vue'
import Timepicker from "./timepicker.vue"

const props = defineProps({
  /**
   * Function to disable specific times
   * @type {Function}
   * @default () => false
   */
  disableTime: {
    type: Function,
    default: () => false
  },
  /**
   * Show seconds picker in addition to hours and minutes
   * @type {Boolean}
   */
  withSec: Boolean,
  /**
   * Use 24-hour format instead of 12-hour AM/PM format
   * @type {Boolean}
   * @default true
   */
  is24Hour: {
    type: Boolean,
    default: true
  },
  /**
   * Disable the overlay background when picker is open
   * @type {Boolean}
   */
  noOverlay: Boolean,
  /**
   * The model value in time string format (HH:MM or HH:MM:SS)
   * @type {String}
   */
  modelValue: String
})

const emit = defineEmits([
  /**
   * Emitted when the time value changes
   * @param {String} value - The updated time value
   */
  'update:modelValue'
])

// Reactive data
const active = ref(false)
const show_modal = ref(false)
const lazyValue = ref(props.modelValue || '')

// Methods
/**
 * Emits the updated time value to the parent component
 */
const emitValue = () => {
  emit('update:modelValue', lazyValue.value)
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  lazyValue.value = newValue || ''
})
</script>

<style lang="scss">
.modal-timepicker {
  .modal-mini {
    max-width: 285px !important;
  }
}
</style>
