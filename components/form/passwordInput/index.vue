<template>
  <r-input :active="active"
           :class="$r.prefix+'password-input'"
           :error="!isValid"
           :icon="show?$r.icons.eye_off:$r.icons.eye"
           :model-value="modelValue"
           @icon="toggleShow"
           @click.prevent="handleClick"
  >
    <input ref="inputRef"
           v-model="lazyValue"
           :autocomplete="autocomplete"
           :autofocus="autofocus"
           :placeholder="placeholder"
           :type="show?'text':'password'"
           @focusin="active=true"
           @focusout="active=false"
           @input="emitValue"
    />
    <template v-if="!hideRequirements" v-slot:message>
      <r-progress-line :color="strengthColor" :model-value="passwordStrength" class="mb-2"></r-progress-line>
      <div :class="{'color-success-text':hasLength,'color-error-text':!hasLength}" class="msg-item">
        <r-icon v-if="hasLength" exact v-html="$r.icons.check"></r-icon>
        <r-icon v-else v-html="$r.icons.close"></r-icon>
        {{ $t(['min_length_password', [minLength]]) }}
      </div>
      <div v-if="lowerCase" :class="{'color-success-text':hasLowerCase,'color-error-text':!hasLowerCase}"
           class="msg-item">
        <r-icon v-if="hasLowerCase" exact v-html="$r.icons.check"></r-icon>
        <r-icon v-else v-html="$r.icons.close"></r-icon>
        {{ $t('lower_case_password') }}
      </div>
      <div v-if="number" :class="{'color-success-text':hasNumber,'color-error-text':!hasNumber}" class="msg-item">
        <r-icon v-if="hasNumber" exact v-html="$r.icons.check"></r-icon>
        <r-icon v-else v-html="$r.icons.close"></r-icon>
        {{ $t('number_password') }}
      </div>
      <div v-if="upperCase" :class="{'color-success-text':hasUpperCase,'color-error-text':!hasUpperCase}"
           class="msg-item">
        <r-icon v-if="hasUpperCase" exact v-html="$r.icons.check"></r-icon>
        <r-icon v-else v-html="$r.icons.close"></r-icon>
        {{ $t('upper_case_password') }}
      </div>
      <div v-if="specialChar" :class="{'color-success-text':hasSpecialChar,'color-error-text':!hasSpecialChar}"
           class="msg-item">
        <r-icon v-if="hasSpecialChar" exact v-html="$r.icons.check"></r-icon>
        <r-icon v-else v-html="$r.icons.close"></r-icon>
        {{ $t('special_char_password') }}
      </div>
    </template>
  </r-input>
</template>
<script setup>
import {ref, computed, watch, nextTick, useAttrs} from 'vue'

const attr = useAttrs()
const placeholder = attr.placeholder
const autofocus = attr.autofocus

const props = defineProps({
  /**
   * The password input's model value
   * @type {String|Number}
   */
  modelValue: [String, Number],
  /**
   * Hide password strength requirements display
   * @type {Boolean}
   */
  hideRequirements: Boolean,
  /**
   * Require at least one lowercase letter
   * @type {Boolean}
   */
  lowerCase: Boolean,
  /**
   * Require at least one uppercase letter
   * @type {Boolean}
   */
  upperCase: Boolean,
  /**
   * Require at least one special character (!@#$%^&*)
   * @type {Boolean}
   */
  specialChar: Boolean,
  /**
   * Require at least one number
   * @type {Boolean}
   */
  number: Boolean,
  /**
   * Minimum password length requirement
   * @type {Number}
   * @default 8
   */
  minLength: {
    type: Number,
    default: 8
  },
  /**
   * HTML autocomplete attribute value
   * @type {String}
   */
  autocomplete: String
})

const emit = defineEmits([
  /**
   * Emitted when the password value changes
   * @param {String} value - The updated password value
   */
  'update:modelValue',
  /**
   * Emitted when password strength changes
   * @param {Object} strengthData - Password strength information
   * @param {Number} strengthData.strength - Password strength score (0-100)
   * @param {Number} strengthData.level - Password strength level (0-4)
   */
  'strength-change'
])

// Reactive data
const lazyValue = ref(props.modelValue || '')
const show = ref(false)
const active = ref(false)
const inputRef = ref(null)

// Computed properties - Password requirement checks
/**
 * Checks if password meets minimum length requirement
 * @returns {Boolean} True if password meets length requirement
 */
const hasLength = computed(() => {
  if (!lazyValue.value) return false
  return lazyValue.value.length >= props.minLength
})

/**
 * Checks if password contains at least one uppercase letter
 * @returns {Boolean} True if password contains uppercase letter
 */
const hasUpperCase = computed(() => {
  if (!lazyValue.value) return false
  return /[A-Z]/.test(lazyValue.value)
})

/**
 * Checks if password contains at least one number
 * @returns {Boolean} True if password contains number
 */
const hasNumber = computed(() => {
  if (!lazyValue.value) return false
  return /[0-9]/.test(lazyValue.value)
})

/**
 * Checks if password contains at least one lowercase letter
 * @returns {Boolean} True if password contains lowercase letter
 */
const hasLowerCase = computed(() => {
  if (!lazyValue.value) return false
  return /[a-z]/.test(lazyValue.value)
})

/**
 * Checks if password contains at least one special character
 * @returns {Boolean} True if password contains special character
 */
const hasSpecialChar = computed(() => {
  if (!lazyValue.value) return false
  return /[!@#$%^&*]/.test(lazyValue.value)
})

// Computed properties
/**
 * Calculates password strength score (0-100)
 * @returns {Number} Password strength score
 */
const passwordStrength = computed(() => {
  if (!lazyValue.value) return 0

  let score = 0
  const length = lazyValue.value.length
  score += Math.min(40, (length / 128) * 40)

  const varietyCount = [hasLowerCase.value, hasUpperCase.value, hasNumber.value, hasSpecialChar.value].filter(Boolean).length
  score += (varietyCount / 4) * 40

  if (length >= 12 && varietyCount >= 3) score += 20

  return Math.min(100, score)
})

/**
 * Determines CSS color class based on password strength
 * @returns {String} CSS color class for strength indicator
 */
const strengthColor = computed(() => {
  const strength = passwordStrength.value

  if (strength >= 80) return 'color-success'
  if (strength >= 60) return 'color-info'
  if (strength >= 40) return 'color-warning'
  return 'color-error'
})

/**
 * Determines password strength level (0-4)
 * @returns {Number} Password strength level
 *
 * Levels:
 * - 0: No password or very weak
 * - 1: Weak (score > 0)
 * - 2: Fair (score >= 40)
 * - 3: Good (score >= 60)
 * - 4: Strong (score >= 80)
 */
const strengthLevel = computed(() => {
  const strength = passwordStrength.value

  if (strength >= 80) return 4
  if (strength >= 60) return 3
  if (strength >= 40) return 2
  if (strength > 0) return 1
  return 0
})

/**
 * Checks if password meets all configured requirements
 * @returns {Boolean} True if password is valid according to all requirements
 */
const isValid = computed(() => {
  let valid = true
  if (!hasLength.value) valid = false
  if (props.lowerCase && !hasLowerCase.value) valid = false
  if (props.upperCase && !hasUpperCase.value) valid = false
  if (props.number && !hasNumber.value) valid = false
  if (props.specialChar && !hasSpecialChar.value) valid = false

  return valid
})

// Methods
/**
 * Focuses the password input field
 */
const handleClick = () => {
  inputRef.value?.focus()
}

/**
 * Emits updated password value and strength data
 */
const emitValue = () => {
  emit('update:modelValue', lazyValue.value)
  emit('strength-change', {
    strength: passwordStrength.value,
    level: strengthLevel.value
  })
}

/**
 * Toggles password visibility and refocuses input
 */
const toggleShow = () => {
  show.value = !show.value
  nextTick(() => inputRef.value?.focus())
}

// Watchers
watch(() => props.modelValue, (newValue) => {
  lazyValue.value = newValue || ''
})

watch(lazyValue, () => {
  emitValue()
})
</script>
<style lang="scss">
@use "../../../style" as *;

.#{$prefix}password-input {
  .msg-item {
    display: flex;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .massage {
    display: block;
  }
}
</style>