<template>
  <div :class="`${$r.prefix}input-tel`">
    <r-btn :disabled="!select||readonly"
           :rounded="!c_tile" class="btn-country ltr ms-1" outlined @click.stop="toggleDropdown">
      <div :class="activeCountry.iso2.toLowerCase()" class="iti-flag"></div>
      <span class="country-code pa-1"> +{{ activeCountry.dialCode }} </span>
      <span class="dropdown-arrow">{{ open ? "▲" : "▼" }}</span>
    </r-btn>
    <r-text-input v-model="tel.phone" :label="label?label:$t('phone','renusify')"
                  :readonly="readonly"
                  :rules="required?['required','number']:['number']"
                  :tile="c_tile"
                  class="input-phone"
                  @update:model-value="emit"
    >
    </r-text-input>
    <r-modal
        v-model="open"
    >
      <div class="pa-2">
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
      </div>
    </r-modal>
  </div>
</template>

<script>

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
  emits: ['update:modelValue'],
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
  created() {
    import('./assets/all-countries.js').then((d) => {
      this.countries = d.default;
      if (this.modelValue) {
        let a = this.modelValue.split(' ')
        this.tel.country_code = a[0]
        this.tel.phone = a[1]
        this.activeCountry = this.findCountryByCode(this.tel.country_code)
      } else {
        this.initializeCountry()
      }
    })

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
      return this.countries.find(country => country.iso2 === iso)
    },
    findCountryByCode(code = '') {
      return this.countries.find(country => country.dialCode === code)
    },

    choose(country) {
      this.activeCountry = country
      this.emit()
      this.reset()
    },
    reset() {
      this.search = ''
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
  flex-wrap: wrap;
  .btn-country {
    width: 100px;
    border-color: var(--color-sheet-low)

  }

  .input-phone {
    width: calc(100% - 104px);
    min-width: 150px;
  }
}
</style>
