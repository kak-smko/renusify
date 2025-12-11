<template>
  <r-input :class="`${$r.prefix}unit-input`" :active="active"
           :model-value="lazyValue"
           @click.prevent="handleClick">
    <div class="d-flex v-center">
      <input ref="inputRef"
             :autofocus="$attrs.autofocus"
             :type="type"
             @focusin="active=true"
             @focusout="active=false"
             :placeholder="$attrs.placeholder"
             autocomplete="no"
             @input="emitValue"
             v-model="lazyValue"
             :readonly="disableInput"
             :class="{'input-shadow':disableInput}"
             class="me-1"
      />
      <div class="select-unit" :class="{'input-shadow':disableUnit}">
        <r-select-input :readonly="disableUnit" :items="units" v-model="unit"
                        :translate="translate" hide justValue @update:model-value="emitValue"
                        class="mt-0"
                        disableSearch
                        firstSelect></r-select-input>
      </div>
    </div>
  </r-input>
</template>
<script setup>
import {ref, watch, computed} from 'vue'

const props = defineProps({
  /**
   * Input type (text, number, etc.)
   * @type {String}
   * @default 'text'
   */
  type: {
    type: String,
    default: 'text'
  },
  /**
   * Array of available unit options
   * @type {Array}
   * @required
   */
  units: {
    type: Array,
    required: true
  },
  /**
   * The model value object containing value and unit
   * @type {Object}
   * @default () => ({ value: null, unit: null })
   */
  modelValue: {
    type: Object,
    default: () => ({
      value: null,
      unit: null
    })
  },
  /**
   * Disable the value input field
   * @type {Boolean}
   */
  disableInput: Boolean,
  /**
   * Disable the unit selector
   * @type {Boolean}
   */
  disableUnit: Boolean,
  /**
   * Enable translation for unit labels
   * @type {Boolean}
   */
  translate: Boolean
})

const emit = defineEmits([
  /**
   * Emitted when the value or unit changes
   * @param {Object} value - The updated object with value and unit properties
   */
  'update:modelValue'
])

// Reactive data
const lazyValue = ref(props.modelValue?.value ?? null)
const active = ref(false)
const unit = ref(props.modelValue?.unit ?? null)
const inputRef = ref(null)

// Computed properties
/**
 * Gets the currently selected unit or defaults to first unit in array
 * @returns {any|null} The selected unit
 */
const selectedUnit = computed(() => {
  return unit.value || (props.units.length > 0 ? props.units[0] : null)
})

// Methods
/**
 * Focuses the input element
 */
const handleClick = () => {
  inputRef.value?.focus()
}

/**
 * Emits the updated value and unit to the parent component
 */
const emitValue = () => {
  const value = {
    value: lazyValue.value,
    unit: selectedUnit.value
  }

  emit('update:modelValue', value)
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    lazyValue.value = newValue.value ?? null
    unit.value = newValue.unit ?? null
  } else {
    lazyValue.value = null
    unit.value = null
  }
}, {deep: true})
</script>

<style lang="scss">
@use "../../../style" as *;

.#{$prefix}unit-input {
  .input-shadow, .input-shadow * {
    @include disable-states()
  }

  > .input-control {
    @include rtl() {
      padding-left: 0;
    }
    @include ltr() {
      padding-right: 0;
    }
  }

  input {
    flex-grow: 1;
  }

  .select-unit {
    width: calc(35% + 16px);
    overflow-x: clip;

    @include rtl() {
      border-right: 1px solid var(--color-border-low);
    }

    @include ltr() {
      border-left: 1px solid var(--color-border-low);
    }

    .input-control {
      padding: 4px;
    }


    .card-select {
      border-top-right-radius: 0;
      border-top-left-radius: 0;

    }
  }
}
</style>