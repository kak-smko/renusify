<template>
  <r-select-input
      :label="$t('country','renusify')"
      v-model="country"
      v-if="!defaultCountry"
      @update:model-value="emit(true,true)"
      value="id"
      :searchLink="`https://codenus.com/api/apps/address?lang=${$r.lang}`"
      :rules="required?['required']:[]"
      :headers="{'Authorization':''}"
      :readonly="readonly"
      :tile="tile">
  </r-select-input>
  <r-select-input :label="$t('state','renusify')"
                  v-model="state"
                  :disabled="!country"
                  :key="country&&country['id']"
                  v-if="show_state"
                  @update:model-value="emit(false,true)"
                  :searchLink="country&&`https://codenus.com/api/apps/address/${country['id']}?lang=${$r.lang}`"
                  :rules="required?['required']:[]"
                  value="id"
                  :headers="{'Authorization':''}"
                  :readonly="readonly"
                  :tile="tile">

  </r-select-input>
  <r-select-input v-if="show_city"
                  v-model="city"
                  :disabled="!state"
                  :key="state&&(country['id']+'-'+state['id'])"
                  @update:model-value="emit(false,false)"
                  :label="$t('city','renusify')"
                  :searchLink="state&&`https://codenus.com/api/apps/address/${country['id']}/${state['id']}?lang=${$r.lang}`"
                  :rules="required?['required']:[]"
                  value="id"
                  :headers="{'Authorization':''}"
                  :readonly="readonly"
                  :tile="tile">

  </r-select-input>
  <r-text-input v-if="show_zip" @update:model-value="emit(false,false)"
                :label="$t('zip_code','renusify')"
                v-model="zip_code"
                :tile="tile"
                :readonly="readonly"
                :rules="required?['required']:[]"></r-text-input>
  <r-text-area v-if="show_street" @update:model-value="emit(false,false)"
               :label="$t('street','renusify')"
               v-model="street"
               :tile="tile"
               :readonly="readonly"
               :rules="required?['required']:[]"></r-text-area>
</template>
<script>

export default {
  name: 'r-address',
  inheritAttrs: false,
  props: {
    required: Boolean,
    stepShow: Boolean,
    allowCountries: Array,
    hideState: Boolean,
    hideCity: Boolean,
    hideZipCode: Boolean,
    hideStreet: Boolean,
    readonly: Boolean,
    tile: {type: Boolean, default: undefined},
    defaultCountry: Object,
    modelValue: Object
  },
  emits:['update:modelValue'],
  data() {
    return {
      country: this.modelValue ? this.modelValue.country : this.defaultCountry,
      state: this.modelValue ? this.modelValue.state : null,
      city: this.modelValue ? this.modelValue.city : null,
      zip_code: this.modelValue ? this.modelValue.zip_code : null,
      street: this.modelValue ? this.modelValue.street : null
    }
  },
  watch: {
    modelValue() {
      this.country = this.modelValue ? this.modelValue.country : (this.defaultCountry ? this.defaultCountry : null)
      this.state = this.modelValue ? this.modelValue.state : null
      this.city = this.modelValue ? this.modelValue.city : null
      this.zip_code = this.modelValue ? this.modelValue.zip_code : null
      this.street = this.modelValue ? this.modelValue.street : null
    }
  },
  computed: {
    show_state() {
      if (this.stepShow) {
        return !this.hideState && this.country
      } else {
        return !this.hideState
      }
    },
    show_city() {
      if (this.stepShow) {
        return !this.hideCity && this.state
      } else {
        return !this.hideCity
      }
    },
    show_street() {
      if (this.stepShow) {
        return !this.hideStreet && this.city
      } else {
        return !this.hideStreet
      }
    },
    show_zip() {
      if (this.stepShow) {
        return !this.hideZipCode && this.city
      } else {
        return !this.hideZipCode
      }
    }
  },
  methods: {
    emit(clearState = false, clearCity = false) {
      setTimeout(() => {
        let r = {
          country: this.country,
        }
        if (clearState) {
          this.state = null
        }
        if (!this.hideState) {
          r['state'] = this.state
        }
        if (clearCity) {
          this.city = null
        }
        if (!this.hideCity) {
          r['city'] = this.city
        }
        if (!this.hideStreet) {
          r['street'] = this.street
        }
        if (!this.hideZipCode) {
          r['zip_code'] = this.zip_code
        }
        this.$emit('update:modelValue', r)
      }, 10)
    }
  }
}

</script>
