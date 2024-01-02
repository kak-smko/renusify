<template>
  <div :class="`${$r.prefix}input-tel`">
    <r-modal
        v-model="open"
    >
      <r-card class="pa-2">
        <r-text-input
            :label="$t('search','renusify')"
            v-model="search"
        ></r-text-input>
        <r-list :items="countries" :filter="search" @update:model-value="choose">
          <template v-slot="{item}">
            <div
                :class="item.iso2.toLowerCase()"
                class="iti-flag"></div>
            <div class="list-title">{{ item.name }}</div>
            <r-spacer></r-spacer>
            <span class="ltr">+{{ item.dialCode }}</span>
          </template>
        </r-list>
      </r-card>
    </r-modal>
    <r-btn class="btn-country ltr ms-1"
           :rounded="!c_tile" :disabled="!select||readonly" @click.stop="toggleDropdown" outlined>
      <div :class="activeCountry.iso2.toLowerCase()" class="iti-flag"></div>
      <span class="country-code pa-1"> +{{ activeCountry.dialCode }} </span>
      <span class="dropdown-arrow">{{ open ? "▲" : "▼" }}</span>
    </r-btn>
    <r-text-input class="input-phone" :label="label?label:$t('phone','renusify')"
                  @update:model-value="emit"
                  :tile="c_tile"
                  :readonly="readonly"
                  :rules="required?['required','number']:['number']"
                  v-model="tel.phone"
    >
    </r-text-input>

  </div>
</template>

<script>
import allCountries from './assets/all-countries.js'

export default {
  name: 'inputTel',
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: String
    },
    defaultCountry: {
      type: String,
      default: 'US'
    },
    tile: {type: Boolean, default: undefined},
    required: Boolean,
    readonly: Boolean,
    select: {
      type: Boolean,
      default: false
    }

  },
  emits:['update:modelValue'],
  data() {
    return {
      tel: {
        'phone': '',
        'country_code': ''
      },
      search: '',
      countries: [],
      activeCountry: {iso2: 'US', dialCode: '1'},
      open: false
    }
  },
  mounted() {
    this.initializeCountry()
    this.countries = allCountries
  },
  created() {
    if (this.modelValue) {
      let a = this.modelValue.split(' ')
      this.tel.country_code = a[0]
      this.tel.phone = a[1]
      this.activeCountry.dialCode = this.tel.country_code
    }
  },
  computed: {
    c_tile() {
      if (this.tile === undefined && this.$r.inputs.tile) {
        return this.$r.inputs.tile
      }
      return this.tile
    },
  },
  methods: {
    initializeCountry() {
      if (this.defaultCountry) {
        const defaultCountry = this.findCountry(this.defaultCountry)
        if (defaultCountry) {
          this.activeCountry = defaultCountry
        }
      }
    },
    findCountry(iso = '') {
      return allCountries.find(country => country.iso2 === iso)
    },

    choose(country) {
      this.activeCountry = country
      this.emit()
      this.reset()
    },
    reset() {
      this.search = ''
      this.countries = allCountries
      this.open = false
    },

    emit(e) {
      if (this.readonly) {
        return
      }
      this.tel.country_code = this.activeCountry.dialCode

      setTimeout(() => {
        this.tel.phone = this.$helper.replacer(this.tel.phone, ' ', '')
        if (this.tel.phone.startsWith('0')) {
          this.tel.phone = this.tel.phone.substr(1, this.tel.phone.length)
          this.$emit('update:modelValue', this.tel.country_code + ' ' + this.tel.phone)
        } else {
          this.$emit('update:modelValue', this.tel.country_code + ' ' + this.tel.phone)
        }
      }, 10)

    },
    toggleDropdown() {
      this.open = !this.open
    }
  }
}
</script>

<style src="./assets/sprite.css"></style>
<style lang="scss">
@import "../../../style/include";

.#{$prefix}input-tel {
  display: flex;
  align-items: baseline;
  direction: ltr;

  .btn-country {
    width: 120px;
    border-color: var(--color-sheet-low)

  }

  .input-phone {
    width: calc(100% - 120px);
  }
}
</style>
