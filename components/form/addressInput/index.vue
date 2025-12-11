<template>
  <r-select-input
      :label="$t('country','renusify')"
      v-model="country"
      v-if="!hideCountry||!country"
      :readonly="readonly"
      value="id"
      :searchLink="`${baseUrl}?lang=${$r.lang}`"
      :rules="required?['required']:[]"
      :headers="{'Authorization':''}"
      @update:model-value="emitAddress(true,true)">
  </r-select-input>
  <r-select-input :label="$t('state','renusify')"
                  v-model="state"
                  :disabled="!country"
                  :key="country&&country['id']"
                  v-if="show_state"
                  :readonly="readonly"
                  :searchLink="country&&`${baseUrl}/${country['id']}?lang=${$r.lang}`"
                  :rules="required?['required']:[]"
                  value="id"
                  :headers="{'Authorization':''}"
                  @update:model-value="emitAddress(false,true)">

  </r-select-input>
  <r-select-input v-if="show_city"
                  v-model="city"
                  :disabled="!state"
                  :key="state&&(country['id']+'-'+state['id'])"
                  :readonly="readonly"
                  :label="$t('city','renusify')"
                  :searchLink="state&&`${baseUrl}/${country['id']}/${state['id']}?lang=${$r.lang}`"
                  :rules="required?['required']:[]"
                  value="id"
                  :headers="{'Authorization':''}"
                  @update:model-value="emitAddress(false,false)">

  </r-select-input>
  <r-text-input v-if="show_zip"
                @update:model-value="emitAddress(false,false)"
                :label="$t('zip_code','renusify')"
                v-model="zip_code"
                :readonly="readonly"
                :rules="required?['required']:[]"></r-text-input>
  <r-text-area v-if="show_street" @update:model-value="emitAddress(false,false)"
               :label="$t('street','renusify')"
               v-model="street"
               :readonly="readonly"
               :rules="required?['required']:[]"></r-text-area>
</template>
<script setup>
import {ref, computed, watch, nextTick} from 'vue'

defineOptions({
  inheritAttrs: false
})
const props = defineProps({
  /**
   * Whether the address fields are required
   * @type {Boolean}
   */
  required: Boolean,

  /**
   * Show fields step by step based on previous selections
   * @type {Boolean}
   */
  stepShow: Boolean,

  /**
   * Array of allowed countries to show in country selector
   * @type {Array}
   */
  allowCountries: Array,

  /**
   * Hide the country field
   * @type {Boolean}
   */
  hideCountry: Boolean,

  /**
   * Hide the state/province field
   * @type {Boolean}
   */
  hideState: Boolean,

  /**
   * Hide the city field
   * @type {Boolean}
   */
  hideCity: Boolean,

  /**
   * Hide the zip/postal code field
   * @type {Boolean}
   */
  hideZipCode: Boolean,

  /**
   * Hide the street address field
   * @type {Boolean}
   */
  hideStreet: Boolean,

  /**
   * Make all fields read-only
   * @type {Boolean}
   */
  readonly: Boolean,

  /**
   * Base URL for API calls to fetch address data
   * @type {String}
   * @default "https://codenus.com/api/apps/address"
   */
  baseUrl: {type: String, default: "https://codenus.com/api/apps/address"},

  /**
   * Default country to pre-select
   * @type {Object}
   */
  defaultCountry: Object,

  /**
   * The address model value
   * @type {Object}
   */
  modelValue: Object
})

const emit = defineEmits([
  /**
   * Emitted when address data changes
   * @param {Object} address - The updated address object
   * @param {Object|null} address.country - Selected country
   * @param {Object|null} address.state - Selected state/province
   * @param {Object|null} address.city - Selected city
   * @param {String|null} address.street - Street address
   * @param {String|null} address.zip_code - Zip/postal code
   */
  'update:modelValue'
])

// Reactive data
const country = ref(props.modelValue?.country || props.defaultCountry || null)
const state = ref(props.modelValue?.state || null)
const city = ref(props.modelValue?.city || null)
const zip_code = ref(props.modelValue?.zip_code || null)
const street = ref(props.modelValue?.street || null)

// Computed properties
const show_state = computed(() => {
  if (props.stepShow) {
    return !props.hideState && country.value
  } else {
    return !props.hideState
  }
})

const show_city = computed(() => {
  if (props.stepShow) {
    return !props.hideCity && state.value
  } else {
    return !props.hideCity
  }
})

const show_street = computed(() => {
  if (props.stepShow) {
    return !props.hideStreet && city.value
  } else {
    return !props.hideStreet
  }
})

const show_zip = computed(() => {
  if (props.stepShow) {
    return !props.hideZipCode && city.value
  } else {
    return !props.hideZipCode
  }
})

// Methods
/**
 * Emits the current address data and optionally clears dependent fields
 * @param {Boolean} clearState - Whether to clear the state field
 * @param {Boolean} clearCity - Whether to clear the city field
 * @returns {Promise<void>}
 */
const emitAddress = async (clearState = false, clearCity = false) => {
  await nextTick()
  if (clearState) {
    state.value = null
  }
  if (clearCity) {
    city.value = null
  }

  const result = {
    country: country.value,
  }

  if (!props.hideState) {
    result.state = state.value
  }
  if (!props.hideCity) {
    result.city = city.value
  }
  if (!props.hideStreet) {
    result.street = street.value
  }
  if (!props.hideZipCode) {
    result.zip_code = zip_code.value
  }

  emit('update:modelValue', result)
}

// Watchers
watch(() => props.modelValue, (newVal) => {
  country.value = newVal?.country || (props.defaultCountry || null)
  state.value = newVal?.state || null
  city.value = newVal?.city || null
  zip_code.value = newVal?.zip_code || null
  street.value = newVal?.street || null
})
</script>
