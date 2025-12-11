<template>
  <r-input v-model="tel.phone"
           :active="active"
           :class="`${$r.prefix}input-tel`"
           :rules="required?['required','number']:['number']"
           ltr
           @update:model-value="emitValue"
           @click.prevent="handleClick">
    <div class="d-flex v-center">
      <r-btn :disabled="!select"
             class="btn-country mr-1" text @click.stop="toggleDropdown">
        <div :class="activeCountry.iso2.toLowerCase()" class="iti-flag"></div>
        <span class="country-code pa-1"> +{{ activeCountry.dialCode }} </span>
        <span class="dropdown-arrow">{{ open ? "▲" : "▼" }}</span>
      </r-btn>
      <input ref="input"
             v-model="tel.phone"
             :autofocus="autofocus"
             :placeholder="placeholder"
             :type="type"
             autocomplete="no"
             @focusin="active=true"
             @focusout="active=false"
             @input="emitValue"
      />
    </div>
    <r-modal
        :class="`${$r.prefix}input-tel`"
        v-model="open"
    >
      <div class="px-2 py-5">
        <r-text-input
            :label="$t('search','renusify')"
            v-model="search"
        ></r-text-input>
      </div>
      <div v-for="(item,i) in genItems" :key="i" class="list-item d-flex v-center py-5 px-3 cursor-pointer"
           @click="choose(item)">
        <div
            :class="item.iso2.toLowerCase()"
            class="iti-flag"></div>
        <div class="list-title me-1">{{ item.name }}</div>
        <r-spacer></r-spacer>
        <span class="ltr">+{{ item.dialCode }}</span>
      </div>

    </r-modal>
  </r-input>
</template>

<script setup>
import {ref, nextTick, useAttrs, computed} from 'vue'

const attr = useAttrs()
const placeholder = attr.placeholder
const autofocus = attr.autofocus

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
   * The telephone input's model value (format: "country_code phone_number")
   * @type {String|Number}
   *
   * Example: "1 5551234567" for US number
   */
  modelValue: [String, Number],
  /**
   * Default country ISO code to pre-select
   * @type {String}
   * @default 'US'
   */
  defaultCountry: {
    type: String,
    default: 'US'
  },
  /**
   * Whether the input is required
   * @type {Boolean}
   */
  required: Boolean,
  /**
   * Whether to show country code as a selectable dropdown
   * @type {Boolean}
   * @default false
   */
  select: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  /**
   * Emitted when the telephone value changes
   * @param {String} value - The updated telephone value in format "country_code phone_number"
   */
  'update:modelValue'
])

// Reactive data
const open = ref(false)
const active = ref(false)
const input = ref(null)
const tel = ref({country_code: '', phone: ''})
const search = ref('')
const activeCountry = ref({iso2: 'US', dialCode: '1'})

// Load countries data
let countries = []
import('./assets/all-countries.js').then((d) => {
  countries = d.default;
  if (props.modelValue) {
    let a = props.modelValue.split(' ')
    tel.value.country_code = a[0]
    tel.value.phone = a[1]
    activeCountry.value = findCountryByCode(tel.value.country_code)
  } else {
    initializeCountry()
  }
})

// Methods
/**
 * Focuses the telephone input field
 */
const handleClick = () => {
  if (input.value) {
    input.value.focus()
  }
}

/**
 * Emits the formatted telephone value
 */
const emitValue = () => {
  tel.value.country_code = activeCountry.value.dialCode

  nextTick(() => {
    tel.value.phone = tel.value.phone.replaceAll(' ', '')
    if (tel.value.phone.startsWith('0')) {
      tel.value.phone = tel.value.phone.substring(1, this.tel.phone.length)
      emit('update:modelValue', tel.value.country_code + ' ' + tel.value.phone)
    } else {
      emit('update:modelValue', tel.value.country_code + ' ' + tel.value.phone)
    }
  })
}

/**
 * Initializes the default country based on props
 */
const initializeCountry = () => {
  if (props.defaultCountry) {
    const defaultCountry = findCountry(props.defaultCountry)
    if (defaultCountry) {
      activeCountry.value = defaultCountry
    }
  }
}

/**
 * Finds a country by ISO2 code
 * @param {String} iso - ISO2 country code (e.g., 'US', 'GB')
 * @returns {Object|undefined} Country object if found
 */
const findCountry = (iso = '') => {
  return countries.find(country => country.iso2 === iso)
}

/**
 * Finds a country by dial code
 * @param {String} code - Country dial code (e.g., '1', '44')
 * @returns {Object|undefined} Country object if found
 */
const findCountryByCode = (code = '') => {
  return countries.find(country => country.dialCode === code)
}

/**
 * Selects a country and updates the telephone value
 * @param {Object} country - Selected country object
 */
const choose = (country) => {
  activeCountry.value = country
  emitValue()
  reset()
}

/**
 * Resets the country search and closes dropdown
 */
const reset = () => {
  search.value = ''
  open.value = false
}

/**
 * Toggles the country dropdown visibility
 */
const toggleDropdown = () => {
  open.value = !open.value
}

// Computed properties
/**
 * Generates and filters countries list for dropdown
 * @returns {Array} Filtered list of country objects
 */
const genItems = computed(() => {
  const res = []
  if (countries) {
    const lng = countries.length
    for (let i = 0; i < lng; i++) {
      if (typeof countries[i] === 'object') {
        res[i] = countries[i]
      } else {
        res[i] = {name: countries[i].toString(), value: countries[i]}
      }
    }
  }
  if (search.value) {
    const re = new RegExp(search.value, 'gi')

    return res.filter(function (el) {
      if (el.name.match(re) || el.dialCode.match(re)) {
        return el
      }
    })
  }
  return res
})
</script>

<style src="./assets/sprite.css"></style>
<style lang="scss">
@use "../../../style" as *;

.#{$prefix}input-tel {
  direction: ltr;

  .btn-country {
    width: 100px;
  }

  > .input-control {
    padding-left: 0;
  }

  .label {
    @include ltr() {
      left: 100px;
    }
  }

  .list-item {
    border-bottom: 1px solid var(--color-sheet-low);

    &:hover {
      background-color: var(--color-one-container);
      color: var(--color-on-one-container);
    }
  }
}
</style>
