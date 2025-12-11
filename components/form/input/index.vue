<template>
  <div
      :class="{
        [`${$r.prefix}input-container`]:true,
        'input-invalid':hasError,
        'input-valid':!hasError,
        'input-error':hasError&&genMessages.length>0,
        'hide-detail':hide,
        'input-focused':active,
        'input-disabled':isDisabled,
        'input-ltr':ltr
         }"
  >
    <div ref="input" class="input-control">
      <label v-if="label"
             :class="{
               'label-active':activeLabel,
               'label-margin':((preIcon&&!activeLabel&&!active))
                }"
             :for="computedId"
             class="label"
      >
        <!-- Slot for custom label content. Provide isRequired prop. -->
        <slot name="label" :isRequired="isRequired">
          <span v-if="isRequired" class="color-error-text">*</span> {{ label }}
        </slot>
      </label>
      <span v-if="preIcon" class="pre-icon" @click.prevent.stop="$emit('pre-icon',true)">
         <!-- Slot for pre-icon content -->
      <slot name="preIcon">
        <r-icon v-html="preIcon"></r-icon>
      </slot>
        </span>
      <div class="input-holder">
        <!-- Default slot for input content. Provide isRequired, uid props. -->
        <slot :isRequired="isRequired" :uid="uid"></slot>
      </div>
      <span v-if="icon" class="icon" @click.prevent.stop="$emit('icon',true)">
        <!-- Slot for icon content -->
      <slot name="icon">
        <r-icon v-html="icon"></r-icon>
      </slot>
        </span>
    </div>
    <div class="massage body-3"
         :class="{
            'massage-active':genMessages.length>0,
        }">
      <!-- Slot for custom message display -->
      <slot :messages="genMessages" name="message">{{ genMessages.join(',') }}</slot>
    </div>
  </div>
</template>
<script setup>
import {ref, computed, watch, inject, onMounted, onBeforeUnmount} from 'vue'

const props = defineProps({
  /**
   * Input ID attribute
   * @type {String}
   */
  id: String,

  /**
   * Icon to display after input
   * @type {String}
   */
  icon: String,

  /**
   * Icon to display before input
   * @type {String}
   */
  preIcon: String,

  /**
   * Custom error message
   * @type {String}
   */
  msg: String,

  /**
   * Input label text
   * @type {String}
   */
  label: String,

  /**
   * Input placeholder text
   * @type {String}
   */
  placeholder: String,

  /**
   * The model value for the input (v-model)
   * @type {String|Boolean|Number|Array|Object}
   */
  modelValue: [String, Boolean, Number, Array, Object],

  /**
   * Whether input is in focused state
   * @type {Boolean}
   */
  active: Boolean,

  /**
   * Whether label should always be active
   * @type {Boolean}
   */
  labelActive: Boolean,

  /**
   * Hides validation details
   * @type {Boolean}
   * @default undefined
   */
  hide: {type: Boolean, default: undefined},

  /**
   * Disables the input
   * @type {Boolean}
   */
  disabled: Boolean,

  /**
   * Makes input read-only
   * @type {Boolean}
   */
  readonly: Boolean,

  /**
   * Manually sets error state
   * @type {Boolean}
   */
  error: Boolean,

  /**
   * Auto-focuses input on mount
   * @type {Boolean}
   */
  autofocus: Boolean,

  /**
   * Sets left-to-right text direction
   * @type {Boolean}
   * @default undefined
   */
  ltr: {type: Boolean, default: undefined},

  /**
   * Validation rules
   * @type {Array|Function}
   * @default () => []
   */
  rules: {
    type: [Array, Function],
    default: () => []
  },

  /**
   * Validate input on blur event
   * @type {Boolean}
   * @default true
   */
  validateOnBlur: {type: Boolean, default: true}
})

const emit = defineEmits([
  /**
   * Emitted when pre-icon is clicked
   * @param {Boolean} true - Indicates pre-icon was clicked
   */
  'pre-icon',

  /**
   * Emitted when icon is clicked
   * @param {Boolean} true - Indicates icon was clicked
   */
  'icon',

  /**
   * Emitted when model value changes
   * @param {any} value - New model value
   */
  'update:modelValue'
])

const form = inject('form', false)
const {$r, $v, $helper} = inject('renusify')

const uid = ref('input_' + $helper.uniqueId())
const lazyValue = ref(props.modelValue)
const errorBucket = ref([])
const hasFocused = ref(false)
const hasInput = ref(false)
const isResetting = ref(false)
const valid = ref(false)
const input = ref(null)

const computedId = computed(() => props.id || uid.value)

const isRequired = computed(() => {
  return props.rules ? (Array.isArray(props.rules) && props.rules.indexOf('required') > -1) : false
})

const isDisabled = computed(() => props.disabled || props.readonly)

const hasError = computed(() => {
  if (props.error) {
    return true
  }
  return errorBucket.value.length > 0
})

const genMessages = computed(() => {
  let m = []
  if (props.msg) {
    m = [props.msg]
  }
  return hasMessages.value ? validations.value : m
})

const hasMessages = computed(() => validationTarget.value.length > 0)

const shouldValidate = computed(() => {
  if (isResetting.value) return false
  return hasInput.value || hasFocused.value
})

const validations = computed(() => {
  return validationTarget.value.slice(0, 1)
})

const validationTarget = computed(() => {
  if (shouldValidate.value) {
    return errorBucket.value
  } else return []
})

const activeLabel = computed(() =>
    props.labelActive ||
    ![undefined, '', null].includes(lazyValue.value)
)

/**
 * Deep equality check for two values
 * @param {any} a - First value
 * @param {any} b - Second value
 * @returns {Boolean} True if values are deeply equal
 */
const deepEqual = (a, b) => {
  if (a === b) return true

  if (a instanceof Date && b instanceof Date) {
    if (a.getTime() !== b.getTime()) return false
  }

  if (a !== Object(a) || b !== Object(b)) {
    return false
  }

  const propsA = Object.keys(a)

  if (propsA.length !== Object.keys(b).length) {
    return false
  }

  return propsA.every(p => deepEqual(a[p], b[p]))
}

/**
 * Resets input value to null
 */
const reset = () => {
  isResetting.value = true
  emit('update:modelValue', null)
}

/**
 * Resets validation state
 */
const resetValidation = () => {
  isResetting.value = true
}

/**
 * Validates input value against rules
 * @param {Boolean} force - Force validation regardless of state
 * @param {any} value - Value to validate (defaults to modelValue)
 * @returns {Boolean} True if validation passes
 */
const validate = (force = false, value) => {
  const errorBucketLocal = []
  value = value || props.modelValue
  if (force) {
    hasInput.value = true
    hasFocused.value = true
  }

  const rules = $v ? $v(props.rules) : props.rules

  if (Array.isArray(rules)) {
    for (let index = 0; index < rules.length; index++) {
      const rule = rules[index]
      const validResult = typeof rule === 'function' ? rule(value) : rule

      if (typeof validResult === 'string') {
        errorBucketLocal.push(validResult)
      } else if (typeof validResult !== 'boolean') {
        console.log(`Rules should return a string or boolean, received '${typeof validResult}' instead`, this)
      }
    }
  }

  errorBucket.value = errorBucketLocal
  valid.value = errorBucketLocal.length === 0
  return valid.value
}

watch(() => props.rules, (newVal, oldVal) => {
  if (deepEqual(newVal, oldVal)) return
  validate()
}, {deep: true})

watch(isResetting, () => {
  setTimeout(() => {
    hasInput.value = false
    hasFocused.value = false
    isResetting.value = false
    validate()
  }, 0)
})

watch(() => props.modelValue, (val) => {
  hasInput.value = true
  lazyValue.value = val
  validate()
})

validate()

onMounted(() => {
  if (input.value) {
    let inp = input.value.querySelector('input')
    if (inp) {
      inp.setAttribute('id', uid.value)
    }
  }
})

if (form) {
  const formInput = {
    uid: uid.value,
    hasError,
    validate: (force = false) => validate(force),
    reset: () => reset(),
    resetValidation: () => resetValidation()
  }

  form.register(formInput)

  onBeforeUnmount(() => {
    form.unregister(formInput)
  })
}
</script>
<style lang="scss">
@use "sass:map";
@use "../../../style" as *;


.#{$prefix}input-container {
  position: relative;
  align-items: flex-start;
  text-align: start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  line-height: 24px;
  font-size: 1rem;
  letter-spacing: normal;
  margin-top: 20px;

  &.input-ltr {
    input, textarea {
      direction: ltr;
    }
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--color-on-sheet-low);
    opacity: 0.7;
  }

  &.input-disabled {
    opacity: 0.38;
    pointer-events: none;
  }


  input {
    max-height: 32px
  }

  input,
  textarea {
    flex: 1 1 auto;
    line-height: 20px;
    padding: 8px 0 8px;
    max-width: 100%;
    min-width: 0px;
    width: 100%;
    outline: none;
    position: relative;

    &[type=text ]::-ms-clear {
      display: none
    }

    &:invalid {
      box-shadow: none
    }

    &:focus,
    &:active {
      outline: none
    }
  }

  .input-control {
    display: flex;
    height: 40px;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    border: solid 1px var(--color-sheet-low);
    background-color: var(--color-sheet-container);
    color: var(--color-on-sheet);
    caret-color: var(--color-on-sheet);
    padding: 0 8px;
    border-radius: map.get($borders, 'sm');
    transition: $primary-transition;

    .input-holder {
      flex-grow: 1;
      border-radius: inherit;
    }

    .icon {
      cursor: pointer;
      @include ltr() {
        margin-left: 4px;
      }
      @include rtl() {
        margin-right: 4px;
      }

    }

    .pre-icon {
      cursor: pointer;
      @include ltr() {
        margin-right: 4px;
      }
      @include rtl() {
        margin-left: 4px;
      }

    }
  }

  &.hide-detail {
    > .input-control {
      border: unset !important;
      height: auto;
      padding: 0;
      background-color: unset !important;
    }
  }

  .label {
    white-space: nowrap;
    position: absolute;
    z-index: 0;
    top: 8px;
    transition: $primary-transition;

    @include ltr() {
      left: 10px;
    }

    @include rtl() {
      right: 10px;
    }
  }

  .label-margin {
    @include ltr() {
      margin-left: 25px;
    }

    @include rtl() {
      margin-right: 25px;
    }
  }

  .label-active {
    @include ltr() {
      transform: translateY(-30px) scale(.9);
      left: 0;
    }
    @include rtl() {
      transform: translateY(-30px) scale(.9);
      right: 0;
    }
    transition: $primary-transition
  }


  &.input-focused {
    .input-control {
      color: var(--color-one);
      border-color: currentColor;

      .input-holder {
        color: var(--color-on-sheet);
      }
    }

    .#{$prefix}icon, .#{$prefix}btn {
      color: currentColor;
    }

    .label {
      color: currentColor;
      @include ltr() {
        transform: translateY(-30px) scale(.9);
        left: 0;
      }
      @include rtl() {
        transform: translateY(-30px) scale(.9);
        right: 0;
      }
      transition: $primary-transition
    }

  }

  .massage {
    display: none;
    width: 100%;

    &-active {
      display: block;
    }
  }


  &.input-error {
    color: var(--color-error);

    .input-control {
      background: var(--color-error-container);
      color: var(--color-on-error-container);
      caret-color: var(--color-on-error-container);
    }
  }

  &:not(.input-error) {
    .massage-active {
      color: var(--color-info)
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
}

</style>
