<template>
    <r-input
        :class="`${$r.prefix}timepicker-range`"
        :active="active"
        :model-value="lazyValue[1]"
        @click.prevent="openPicker('from')"
    >
      <input
          type="text"
          :placeholder="$attrs.placeholder"
          @focusin="active = true"
          @focusout="active = false"
          autocomplete="no"
          ref="input"
          :value="strVal"
      />
      <r-modal
        class="modal-timepicker"
        v-model="show_modal"
        no-close-btn
        :no-overlay="noOverlay"
    >
      <div class="pt-3">
        <div class="pa-2 title-1 text-center">
          <span>{{ $t('from', 'renusify') }}: </span>
          <span v-if="lazyValue[0]">{{ lazyValue[0] }} - </span>
          <span>{{ $t('to', 'renusify') }}: </span>
          <span v-if="lazyValue[1]">{{ lazyValue[1] }}</span>
        </div>
        <timepicker
            v-if="state==='from'"
            class="mb-2 mx-3"
            is24Hour
            :withSec="withSec"
            v-model="lazyValue[0]"
        ></timepicker>
        <timepicker
            v-if="state==='to'"
            class="mb-2 mx-3"
            is24Hour
            :withSec="withSec"
            :disableTime="disableTime"
            v-model="lazyValue[1]"
        ></timepicker>

        <div class="my-3 d-flex h-space-between px-3">
        <r-btn
            class="color-success-text"
            outlined
            @click.prevent="accept"
        >
          {{ $t(state === 'to' ? 'accept' : 'next', 'renusify') }}
        </r-btn>
        <r-btn
            class="color-warning-text"
            outlined
            @click.prevent="(show_modal = false),clear()"
        >
          {{ $t('cancel', 'renusify') }}
        </r-btn>
        </div>
      </div>
    </r-modal>
    </r-input>
</template>

<script setup>
import {ref, watch, computed} from 'vue'
import Timepicker from "./timepicker.vue";

const props = defineProps({
  withSec: Boolean,
  noOverlay: Boolean,
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const state = ref('from') // 'from' or 'to'
const active = ref(false)
const show_modal = ref(false)
const lazyValue = ref(props.modelValue || [])


const strVal = computed(() => {
  if (lazyValue.value.length >= 2) {
    return `${lazyValue.value[0] || ''} - ${lazyValue.value[1] || ''}`
  }
  return ''
})

const fromH = computed(() => {
  if (!lazyValue.value[0]) return 0
  return parseInt(lazyValue.value[0].split(':')[0]) || 0
})

const fromM = computed(() => {
  if (!lazyValue.value[0]) return 0
  return parseInt(lazyValue.value[0].split(':')[1]) || 0
})

const fromS = computed(() => {
  if (!lazyValue.value[0]) return 0
  return parseInt(lazyValue.value[0].split(':')[2]) || 0
})

const str2int = (s) => {
  if (!s) return 0
  return parseInt(s.replace(/:/g, '')) || 0
}

const disableTime = (n, t, h, m) => {
  if (state.value !== 'to') return false

  if (t === 'hours24') {
    return n < fromH.value
  }

  if (t === 'mins') {
    if (h.toString() === fromH.value.toString()) {
      if (props.withSec) {
        return n < fromM.value
      } else {
        return n <= fromM.value
      }
    }
  }

  if (props.withSec && t === 'seconds') {
    if (h.toString() === fromH.value.toString() && m.toString() === fromM.value.toString()) {
      return n <= fromS.value
    }
  }

  return false
}

const accept = () => {
  if (state.value === 'to') {
    if (lazyValue.value.length >= 2) {
      const fromTimeInt = str2int(lazyValue.value[0])
      const toTimeInt = str2int(lazyValue.value[1])

      if (fromTimeInt < toTimeInt) {
        state.value = 'from'
        show_modal.value = false
        emitValue()
      } else {
        console.error(`From time (${fromTimeInt}) must be before To time (${toTimeInt})`)
      }
    }
  } else {
    state.value = 'to'
  }
}

const emitValue = () => {
  emit('update:modelValue', lazyValue.value)
}

const openPicker = (type = 'from') => {
  state.value = type
  show_modal.value = true
  active.value = true
}

const clear = () => {
  lazyValue.value = []
  state.value = 'from'
  emitValue()
}

watch(() => props.modelValue, (newValue) => {
  lazyValue.value = newValue || []
}, {deep: true})

</script>

<style lang="scss">
.modal-timepicker {
  .modal-mini {
    max-width: 285px !important;
  }
}
</style>
